from test import get_chat_completion
class Game:
    def __init__(self, user, characters, relationships):
        self.user = user
        self.characters = {str(character.name): character for character in characters}
        self.relationships = {tuple(sorted((str(relationship.name1), str(relationship.name2)))): relationship for relationship in relationships}

    # def run_step(self, character1, character2):

    def run_step_user(self, user_input, other_character):
        system = f"You are {other_character.name} and you are talking to {self.user.name}."
        messages = [
            {"role": "system", "content": system},
            {"role": "user", "content": other_character.context},
            {"role": "user", "content": f"{self.user.name}: {user_input}"}
        ]
        while response:
            response = get_chat_completion(messages)

        return response




    