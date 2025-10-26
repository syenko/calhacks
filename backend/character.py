class Character:
    def __init__(self, name, age, gender):
        self.name = name # uuid
        self.age = age
        self.gender = gender
        self.context = {
            1: "i am a cool person"
        }

# 2 levels of context
    # some levels 
class Relationship:
    def __init__(self, name, relationship_type, context):
        self.name = name
        self.relationship_type = ""
        self.intimacy = 1
        self.context = "" # system + level2 + boy1 + boy2 + level3