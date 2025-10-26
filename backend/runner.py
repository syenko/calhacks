from character import Character, Relationship
from game import Game
import json

def main():
    # Load characters from JSON file
    with open("characters.json", "r") as f:
        data = json.load(f)


    characters_raw = data["characters"]
    relationships_raw = data["relationships"]
    
    characters = [
        Character(char["name"], char["age"], char["gender"]) 
        for char in characters_raw
    ]

    relationships = [
        Relationship(rel["name1"], rel["name2"], rel["relationship_type"], rel["context"], rel["reveals"])
        for rel in relationships_raw
    ]
    
    game = Game(characters)
    game.run()

if __name__ == "__main__":
    main()