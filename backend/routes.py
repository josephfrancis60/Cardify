from flask import request, jsonify
from sqlalchemy.exc import IntegrityError  # for error handling
from app import app, db
from models import Profile


# Get all profiles
@app.route("/profiles", methods=["GET"])
def get_profiles():
    profiles = Profile.query.all()
    result = [profile.to_json() for profile in profiles]
    return jsonify({"profiles": result}), 200   # response status code:200 


# Create a profile
@app.route("/profiles", methods=["POST"])
def create_profile():
    data = request.json

    # Extract required fields
    name = data.get("name")
    role = data.get("role")
    description= data.get("description", "")  # defaults to an empty string
    gender = data.get("gender")

    # Fetch avatar image based on gender
    if gender == "Male":
        img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
    elif gender == "Female":
        img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
    else:
        img_url = None
    
    social_links = data.get("social_links", [])  # defaults to an empty list
    categories = data.get("categories", [])  # defaults to an empty list

    # Validation: muat enter these fields
    required_fields = ["name", "role", "gender"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f'Missing required field: {field}'}), 400
    
    # creating a new profile instance
    new_profile = Profile(name=name, role=role, description=description, gender=gender, img_url=img_url, social_links=social_links, categories=categories)

    #  saving to database with error handling
    try:
        db.session.add(new_profile)
        db.session.commit()
    except IntegrityError:   # error handling for unique social link
        db.session.rollback()
        return jsonify({"error": "The provided social link already exists. Please use a unique social link"}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to create profile", "details":str(e)}), 500
    
    return jsonify({"message": "Profile created successfully"}), 201


# Update a profile
@app.route("/profiles/<int:id>", methods=["PATCH"])
def update_profile(id):
    try:
        profile = Profile.query.get(id)
        if profile is None:
            return jsonify({"error": "Friend not found"}), 400
        
        data = request.json
        profile.name = data.get("name", profile.name)
        profile.role = data.get("role", profile.role)
        profile.description = data.get("description", profile.description)
        profile.gender = data.get("gender", profile.gender)
        profile.social_links = data.get("social_links", profile.social_links)
        profile.categories = data.get("categories", profile.categories)

        db.session.commit()
        return jsonify({"message": "Profile updated successfully"}), 200     # return jsonify(profile.to_json()), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500


# Delete a profile
@app.route("/profiles/<int:id>", methods=["DELETE"])
def delete_profile(id):
    try:
        profile = Profile.query.get(id)
        if not profile:
            return jsonify({"error": "Profile not found"}), 404
        
        db.session.delete(profile)
        db.session.commit()
        return jsonify({"message": "Profile deleted"}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500
    
#
