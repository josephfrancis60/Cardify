from flask import request, jsonify
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

    name = data.get("name")
    role = data.get("role")
    description= data.get("description")
    gender = data.get("gender")

    # Fetch avatar image based on gender
    if gender == "Male":
        img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
    elif gender == "Female":
        img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
    else:
        img_url = None
    
    social_links = data.get("social_links", [])
    categories = data.get("categories", [])

    # Validation: muat enter these fields
    required_fields = ["name", "role", "gender"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f'Missing required field: {field}'}), 400
    
    new_profile = Profile(name=name, role=role, description=description, gender=gender, img_url=img_url, social_links=social_links, categories=categories)

    try:
        db.session.add(new_profile)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "Profile created successfully"}), 201