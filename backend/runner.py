from character import Character, Relationship
from game import Game
from test import get_chat_completion
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
        user_input = input(f"What do you want to say to {character.name}?: ")
        system = f"You are {character.name} and you are talking to {user.name}."
        messages = [
            {"role": "system", "content": system},
            {"role": "user", "content": character.context},
            {"role": "user", "content": f"{user.name}: {user_input}"}
        ]
        while user_input != 'q':
            response = get_chat_completion(messages)
            print(response)
            user_input = input(f"What do you want to say to {character.name}? (enter 'q' to quit): ")
            messages.append({"role": "assistant", "content": response})
            messages.append({"role": "user", "content": f"{user.name}: {user_input}"})
            


if __name__ == "__main__":
    main()