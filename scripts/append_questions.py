import json
import os
import sys

def append_questions(file_path, new_questions):
    if not os.path.exists(file_path):
        data = []
    else:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    
    data.extend(new_questions)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4)
    print(f"Successfully added {len(new_questions)} questions to {file_path}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python append_questions.py <file_path> <questions_json_file>")
        sys.exit(1)
    
    file_path = sys.argv[1]
    questions_file = sys.argv[2]
    
    with open(questions_file, 'r', encoding='utf-8') as f:
        new_q = json.load(f)
    
    append_questions(file_path, new_q)
