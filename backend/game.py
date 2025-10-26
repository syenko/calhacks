
class Game:
    def __init__(self, characters):
        self.characters = {str(character.name): character for character in characters}