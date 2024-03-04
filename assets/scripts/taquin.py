import json
import sys


class Position:
    def __init__(self, x, y):
        self.x = x
        self.y = y


class Utils:
    @staticmethod
    def afficher_matrix(M):
        for row in M:
            print(" ".join(map(str, row)))


class Taquin:
    def __init__(self, grid, final_state, actions):
        self.grid = grid
        self.taille = len(grid)
        self.actions = actions
        self.final_state = final_state
        self.best_path = []
        self.cost = float("inf")
        self.is_soluble(self.grid)

    def can_move(self, position):
        return 0 <= position.x < self.taille and 0 <= position.y < self.taille

    def is_soluble(self, state):
        # This method is incomplete in the original code.
        # For simplicity, we'll assume the puzzle is always solvable.
        return True

    def get_neighbors(self, state):
        position_zero = self.get_position_zero(state)
        neighbors = []
        for action in self.actions:
            next_position = Position(
                position_zero.x + action.x, position_zero.y + action.y
            )
            if self.can_move(next_position):
                current_state = [row.copy() for row in state]
                temp = current_state[next_position.x][next_position.y]
                current_state[next_position.x][next_position.y] = current_state[
                    position_zero.x
                ][position_zero.y]
                current_state[position_zero.x][position_zero.y] = temp
                neighbors.append(current_state)
        return neighbors

    def get_position_zero(self, state):
        for i in range(self.taille):
            for j in range(self.taille):
                if state[i][j] == 0:
                    return Position(i, j)
        return Position(0, 0)

    def bfs(self):
        # Flatten the initial grid to start the path
        initial_path = [cell for row in self.grid for cell in row]
        queue = [{"vertice": self.grid, "path": [initial_path]}]
        visited = set()
        visited.add(str(self.grid))
        while queue:
            current = queue.pop(0)
            if str(current["vertice"]) == str(self.final_state):
                if self.cost > len(current["path"]):
                    self.cost = len(current["path"])
                    self.best_path = current["path"]
                return
            neighbors = self.get_neighbors(current["vertice"])
            for neighbor in neighbors:
                if str(neighbor) not in visited:
                    # Flatten the neighbor state before adding it to the path
                    flattened_neighbor = [cell for row in neighbor for cell in row]
                    queue.append(
                        {
                            "vertice": neighbor,
                            "path": current["path"] + [flattened_neighbor],
                        }
                    )
                    visited.add(str(neighbor))


# Example usage
ACTION = [
    Position(1, 0),
    Position(-1, 0),
    Position(0, 1),
    Position(0, -1),
]
FINAL_STATE = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
]
# CURRENT_STATE = [
#     [1, 2, 3],
#     [4, 5, 6],
#     [7, 0, 8],
# ]

numbers_json = sys.argv[1]
numbers = json.loads(numbers_json)

transformed_list = [numbers[i : i + 3] for i in range(0, len(numbers), 3)]
CURRENT_STATE = transformed_list[:]

taquin = Taquin(CURRENT_STATE, FINAL_STATE, ACTION)
taquin.bfs()
print(taquin.best_path)
