from character import Character, Relationship
from game import Game
import json

def main():
    # Load characters from JSON file
    with open("characters.json", "r") as f:
        data = json.load(f)

    user = Character(data["user"]["name"], data["user"]["description"])
    characters_raw = data["characters"]
    relationships_raw = data["relationships"]
    
    characters = [
        Character(char["name"], char["description"]) 
        for char in characters_raw
    ]

    relationships = [
        Relationship(rel["name1"], rel["name2"], rel["context"], rel["reveals"])
        for rel in relationships_raw
    ]
    
    game = Game(user, characters, relationships)

    for character in characters:
        user_input = input(f"What do you want to say to {character.name}?")
        response = game.run_step_user(user_input, character)
        print(response)


if __name__ == "__main__":
    main()