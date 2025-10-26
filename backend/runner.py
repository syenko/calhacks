import json
import random

from character import Character, Relationship
from game import Game
from test import get_chat_completion

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

    # daisy + sienna
    start_multicharacter_chat(characters[0], characters[1], user)

    # daisy + drew
    start_multicharacter_chat(characters[0], characters[3], user)

    # for character in characters:
    #     start_chat(character, user)


def start_chat(character: Character, user: Character):
    user_input = input(f"What do you want to say to {character.name}?: ") # query front end
    system = f"You are {character.name} and you are talking to {user.name}."
    messages = [
        {"role": "system", "content": system},
        {"role": "user", "content": character.context},
        {"role": "user", "content": f"{user.name}: {user_input}"}
    ]
    while user_input != 'q':
        response = get_chat_completion(messages)
        print(response) # query front end
        user_input = input(f"What do you want to say to {character.name}? (enter 'q' to quit): ") #query front end
        messages.append({"role": "assistant", "content": response})
        messages.append({"role": "user", "content": f"{user.name}: {user_input}"})
            

def start_multicharacter_chat(character_one: Character, character_two: Character, user: Character):
    user_input = input(f"What do you want to say to {character_one.name} and {character_two.name}?: ") # query front end
    system = f"You are {character_one.name} and {character_two.name} and you are talking to {user.name}."
    messages_one = [
        {"role": "system", "content": system},
        {"role": "user", "content": character_one.context},
    ]

    messages_two = [
        {"role": "system", "content": system},
        {"role": "user", "content": character_two.context},
    ]
    while user_input != 'q':
        # 1. randomly select who gets to talk first
        speaker_order = [(character_one, messages_one, character_two, messages_two),
                         (character_two, messages_two, character_one, messages_one)]
        random.shuffle(speaker_order)

        # share the user's latest line with both characters
        user_line = {"role": "user", "content": f"{user.name}: {user_input}"}
        messages_one.append(user_line)
        messages_two.append(dict(user_line))

        for speaker, speaker_messages, listener, listener_messages in speaker_order:
            # 2. generate response for the person who gets to talk
            response = get_chat_completion(speaker_messages)
            print(f"{speaker.name}: {response}") # query front end

            # 3. add 'assistant : response' to messages of the person who just talked
            speaker_messages.append({"role": "assistant", "content": response})

            # 4. add 'user : response' to messages of the listener
            listener_messages.append({"role": "user", "content": f"{speaker.name}: {response}"})

        # 8. cycle finished; prompt user for more input
        user_input = input(
            f"What do you want to say to {character_one.name} and {character_two.name}? (enter 'q' to quit): "
        ) # query front end

if __name__ == "__main__":
    main()