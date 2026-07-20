// Check what TypeScript sees
const code = `
const ref = useRef<HTMLDivElement | null>(null);
const as = 'li' as const; // keyof React.JSX.IntrinsicElements
const Tag = as as 'div';  // CAST to 'div'

// Now JSX sees:
// <div ref={ref}> ✓ matches HTMLDivElement
// But Tag is actually 'li' at runtime

// The assertion 'as "div"' is what prevents TypeScript from warning
`;

console.log("Issue Analysis:");
console.log("================");
console.log("");
console.log("Line 47: const Tag = as as 'div'");
console.log("");
console.log("This type assertion prevents TypeScript from checking ref compatibility.");
console.log("It tells TS: 'treat Tag as the literal type \"div\"'");
console.log("");
console.log("At compile time:");
console.log("  - TS sees: <div ref={ref}> where ref: HTMLDivElement");
console.log("  - No error (types match the assertion)");
console.log("");
console.log("At runtime:");
console.log("  - Tag might be 'li', 'div', or any IntrinsicElement");  
console.log("  - ref.current will be the actual DOM element (HTMLLIElement, etc)");
console.log("  - But TS thinks it's always HTMLDivElement");
console.log("");
console.log("Is this a REAL bug?");
console.log("  - The ref IS working correctly (observer on any element works)");
console.log("  - The type annotation LIES about what element is in the ref");
console.log("  - Code works but type safety is compromised");
