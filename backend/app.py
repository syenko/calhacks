import json
import random
from copy import deepcopy
from pathlib import Path
from typing import Dict, List, Tuple

from flask import Flask, jsonify, request

from character import Character, Relationship
from test import get_chat_completion

app = Flask(__name__)

def _load_characters() -> Tuple[Character, Dict[str, Character], Dict[Tuple[str, str], Relationship]]:
    data_path = Path(__file__).with_name("characters.json")
    with data_path.open("r", encoding="utf-8") as f:
        data = json.load(f)

    user_data = data["user"]
    user_character = Character(user_data["name"], user_data["description"])

    characters: Dict[str, Character] = {
        raw_character["name"]: Character(
            raw_character["name"],
            raw_character["description"],
        )
        for raw_character in data["characters"]
    }

    relationships: Dict[Tuple[str, str], List[str]] = {}
    for raw_relationship in data["relationships"]:
        relationships[(raw_relationship["name1"], raw_relationship["name2"])] = raw_relationship["reveals"]

    return user_character, characters, relationships


USER, CHARACTERS, RELATIONSHIPS = _load_characters()


@app.post("/do_multicharacter_chat")
def do_multicharacter_chat_step():
    payload = request.get_json(silent=True) or {}
    character_one_name = payload.get("character_one")
    character_two_name = payload.get("character_two")
    user_input = payload.get("user_input")
    
    if not character_one_name:
        return jsonify({"error": "Missing required field: character_one"}), 400
    if not character_two_name:
        return jsonify({"error": "Missing required field: character_two"}), 400
    if not user_input:
        return jsonify({"error": "Missing required field: user_input"}), 400

    if character_one_name not in CHARACTERS:
        return jsonify({"error": f"Unknown character: {character_one_name}"}), 404
    if character_two_name not in CHARACTERS:
        return jsonify({"error": f"Unknown character: {character_two_name}"}), 404

    # process inputs then call multiuse function
    do_multicharacter_chat(character_one_name, character_two_name, user_input)

def do_multicharacter_chat(character_one_name: str, character_two_name: str, user_input: str):
    character_one = CHARACTERS[character_one_name]
    character_two = CHARACTERS[character_two_name]

    messages_one = _build_messages(character_one, character_two)
    messages_two = _build_messages(character_two, character_one)

    messages_one.append({"role": "user", "content": f"{USER.name}: {user_input}"})
    messages_two.append({"role": "user", "content": f"{USER.name}: {user_input}"})

    response_text = get_chat_completion(messages_one)
    return response_text


def _build_messages(speaker: Character, listener: Character) -> List[dict]:
    # system_prompt = f"You are {speaker.name} and you are talking to {USER.name} and {listener.name}."
    messages: List[dict] = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": speaker.context},
    ]

    relationship = RELATIONSHIPS.get((speaker.name, listener.name))
    if relationship:
        # if relationship.context:
        #     messages.append({"role": "user", "content": relationship.context})
        if relationship.reveals:
            reveals_text = "\n".join(relationship.reveals)
            messages.append({"role": "user", "content": reveals_text})

    return messages

@app.post("/start_multicharacter_chat")
def start_multicharacter_chat():
    payload = request.get_json(silent=True) or {}

    character_one_name = payload.get("character_one")
    character_two_name = payload.get("character_two")
    user_input = payload.get("user_input")

    missing_fields = [
        field
        for field in ("character_one", "character_two", "user_input")
        if not payload.get(field)
    ]
    if missing_fields:
        message = "Missing required field" if len(missing_fields) == 1 else "Missing required fields"
        return jsonify({"error": f"{message}: {', '.join(missing_fields)}"}), 400

    if character_one_name not in CHARACTERS:
        return jsonify({"error": f"Unknown character: {character_one_name}"}), 404
    if character_two_name not in CHARACTERS:
        return jsonify({"error": f"Unknown character: {character_two_name}"}), 404

    character_one = CHARACTERS[character_one_name]
    character_two = CHARACTERS[character_two_name]

    # TODO: integrate with message_history + update it as we go
    system_prompt_one = f"You are {character_one_name} and you are talking to {USER.name} and {character_two_name}."
    system_prompt_two = f"You are {character_two_name} and you are talking to {USER.name} and {character_one_name}."

    messages_one = [
        {"role": "system", "content": system_prompt_one},
        {"role": "user", "content": character_one.context},
    ]
    messages_two = [
        {"role": "system", "content": system_prompt_two},
        {"role": "user", "content": character_two.context},
    ]

    if (character_one, character_two) in RELATIONSHIPS:
        messages_one.append({"role": "user", "content": RELATIONSHIPS[(character_one_name, character_two_name)]})
    if (character_two, character_one) in RELATIONSHIPS:
        messages_two.append({"role": "user", "content": RELATIONSHIPS[(character_two_name, character_one_name)]})


    user_line = {"role": "user", "content": f"{USER.name}: {user_input}"}
    messages_one.append(user_line)
    messages_two.append(deepcopy(user_line))

    speaker_order = [
        (character_one, messages_one, messages_two),
        (character_two, messages_two, messages_one),
    ]
    random.shuffle(speaker_order)

    responses: List[dict] = []
    for speaker, speaker_messages, listener_messages in speaker_order:
        response_text = get_chat_completion(speaker_messages)
        responses.append({"character": speaker.name, "content": response_text})

        speaker_messages.append({"role": "assistant", "content": response_text})
        listener_messages.append({"role": "user", "content": f"{speaker.name}: {response_text}"})

    return jsonify({
        "responses": responses,
        "speaker_order": [response["character"] for response in responses],
    })


@app.post("/start_chat")
def start_chat():
    payload = request.get_json(silent=True) or {}
    character_name = payload.get("character")
    user_input = payload.get("user_input")
    
    if not character_name:
        return jsonify({"error": "Missing required field: character"}), 400
    if not user_input:
        return jsonify({"error": "Missing required field: user_input"}), 400

    if character_name not in CHARACTERS:
        return jsonify({"error": f"Unknown character: {character_name}"}), 404

    character = CHARACTERS[character_name]
    messages = _build_messages(character, USER)
    messages.append({"role": "user", "content": f"{USER.name}: {user_input}"})

    response_text = get_chat_completion(messages)
    return jsonify({"response": response_text})


if __name__ == "__main__":
    app.run(debug=True)

