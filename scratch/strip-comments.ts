import * as fs from "fs";
import * as path from "path";



function stripComments(code: string): string {
  let result = "";
  let i = 0;
  const len = code.length;
  
  const State = {
    NORMAL: 0,
    SINGLE_QUOTE: 1,
    DOUBLE_QUOTE: 2,
    TEMPLATE_LITERAL: 3,
    LINE_COMMENT: 4,
    BLOCK_COMMENT: 5,
    REGEX: 6
  };
  
  let state = State.NORMAL;
  
  while (i < len) {
    const char = code[i];
    const next = code[i + 1] || "";
    
    switch (state) {
      case State.NORMAL:
        if (char === "/" && next === "/") {
          state = State.LINE_COMMENT;
          i += 2;
        } else if (char === "/" && next === "*") {
          state = State.BLOCK_COMMENT;
          i += 2;
        } else if (char === "'") {
          state = State.SINGLE_QUOTE;
          result += char;
          i++;
        } else if (char === '"') {
          state = State.DOUBLE_QUOTE;
          result += char;
          i++;
        } else if (char === "`") {
          state = State.TEMPLATE_LITERAL;
          result += char;
          i++;
        } else {
          result += char;
          i++;
        }
        break;
        
      case State.LINE_COMMENT:
        if (char === "\n") {
          state = State.NORMAL;
          result += char; 
        }
        i++;
        break;
        
      case State.BLOCK_COMMENT:
        if (char === "*" && next === "/") {
          state = State.NORMAL;
          i += 2;
        } else {
          i++;
        }
        break;
        
      case State.SINGLE_QUOTE:
        if (char === "\\") {
          result += char + next;
          i += 2;
        } else {
          result += char;
          if (char === "'") {
            state = State.NORMAL;
          }
          i++;
        }
        break;
        
      case State.DOUBLE_QUOTE:
        if (char === "\\") {
          result += char + next;
          i += 2;
        } else {
          result += char;
          if (char === '"') {
            state = State.NORMAL;
          }
          i++;
        }
        break;
        
      case State.TEMPLATE_LITERAL:
        if (char === "\\") {
          result += char + next;
          i += 2;
        } else {
          result += char;
          if (char === "`") {
            state = State.NORMAL;
          }
          i++;
        }
        break;
    }
  }
  
  return result;
}

function processDirectory(dir: string) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      
      if (item === "node_modules" || item === ".next" || item === ".git" || item === "generated") {
        continue;
      }
      processDirectory(fullPath);
    } else if (stat.isFile()) {
      const ext = path.extname(item);
      if (ext === ".ts" || ext === ".tsx" || ext === ".js" || ext === ".jsx") {
        const content = fs.readFileSync(fullPath, "utf-8");
        const cleaned = stripComments(content);
        if (cleaned !== content) {
          fs.writeFileSync(fullPath, cleaned, "utf-8");
          console.log(`Cleaned comments from: ${fullPath.replace("d:\\prrabbit\\", "")}`);
        }
      }
    }
  }
}

console.log("Starting comment removal process...");
processDirectory("d:\\prrabbit");
console.log("Finished cleaning comments!");
