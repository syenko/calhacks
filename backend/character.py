from typing import List


class Character:
    def __init__(self, name, context):
        self.name: str = name
        self.context: str = context


class Relationship:
    def __init__(self, name1, name2, context, reveals):
        self.name1 = name1
        self.name2 = name2
        self.context = context
        self.reveals: List[str] = reveals