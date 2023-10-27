import json
import random
from faker import Faker
from uuid import uuid4
import os

fake = Faker()


# SETTINGS
fakeUsers = 20
fakeAuthors = 500
fakeLocations = 2000
fakeMedias = 2000 # must be equal to fakeLocations
fakeRentedMedias = 500


# Generate authors data
authors = []
for author_id in range(1, fakeUsers+1):
    author = {
        "id": author_id,
        "firstName": fake.first_name(),
        "lastName": fake.last_name(),
        "birthday": fake.date_of_birth(minimum_age=18, maximum_age=80).isoformat() + "T00:00:00.000Z",
    }
    authors.append(author)

# Generate locations data
locations = []
used_combinations = set()
for location_id in range(1, fakeLocations+1):
    while True:
        floor = random.randint(1, fakeLocations/100)
        shelf = random.randint(1, fakeLocations/100)
        shelf_section = random.randint(1, fakeLocations/100)
        location = {
            "id": location_id,
            "floor": floor,
            "shelf": shelf,
            "shelfSection": shelf_section,
        }
        location_combo = (floor, shelf, shelf_section)
        if location_combo not in used_combinations:
            used_combinations.add(location_combo)
            locations.append(location)
            break

# Generate media data
media = []
used_combinations = set()
media_types = ["BOOK", "CD", "MAP", "MAGAZINE"]
for media_id in range(1, fakeMedias+1):
    while True:
        book_title = fake.catch_phrase()
        author_id = random.choice(authors)["id"]
        location_id = random.choice(locations)["id"]
        media_type = random.choice(media_types)
        published = bool(random.random() > 0.5)  # 50% chance of being published)),
        media_entry = {
            "id": str(uuid4()),
            "title": book_title,
            "mediaType": media_type,
            "updatedAt": fake.date_time_this_decade().isoformat() + "Z",
            "content": "A " + media_type.lower() + " by " + fake.name(),
            "published": published,
            "ISBN": fake.isbn13(),
            "authorId": author_id,
            "locationId": location_id,
        }
        
        if location_id not in used_combinations:
            used_combinations.add(location_id)
            media.append(media_entry)
            break

# Generate user data
users = []
used_combinations = set()
for user_id in range(1, fakeUsers+1):
     while True:
        email = fake.email()
        user = {
            "id": user_id,
            "firstName": fake.first_name(),
            "lastName": fake.last_name(),
            "birthday": fake.date_of_birth(minimum_age=18, maximum_age=80).isoformat() + "T00:00:00.000Z",
            "email": email,
            "street": fake.street_name(),
            "houseNumber": fake.building_number(),
            "plz": int(fake.zipcode()),
            "city": fake.city(),
        }

        if email not in used_combinations:
            used_combinations.add(email)
            users.append(user)
            break
        

# Generate rented media data
rented_media = []
for rent_id in range(1, fakeRentedMedias+1):  # Generate around 100 rented media entries
    user_id = random.choice(users)["id"]
    media_id = random.choice(media)["id"]
    rented_at = fake.date_time_this_decade().isoformat() + "Z"
    returned_at = fake.date_time_this_decade().isoformat() + "Z" if random.choice([True, False]) else None
    rented_entry = {
        "userId": user_id,
        "mediaId": media_id,
        "rentedAt": rented_at,
        "returnedAt": returned_at,
    }
    
    rented_media.append(rented_entry)

# Save data to JSON files
current_directory = os.getcwd()
current_directory = os.path.join(current_directory, 'swe_library')
current_directory = os.path.join(current_directory, 'sampleData')

with open(os.path.join(current_directory, 'authors.json'), "w") as author_file:
    json.dump(authors, author_file, indent=4)

with open(os.path.join(current_directory, "locations.json"), "w") as location_file:
    json.dump(locations, location_file, indent=4)

with open(os.path.join(current_directory, "medias.json"), "w") as media_file:
    json.dump(media, media_file, indent=4)

with open(os.path.join(current_directory, "users.json"), "w") as user_file:
    json.dump(users, user_file, indent=4)

with open(os.path.join(current_directory, "rentedMedias.json"), "w") as rented_media_file:
    json.dump(rented_media, rented_media_file, indent=4)
