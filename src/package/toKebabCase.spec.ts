import { toKebabCase } from "./toKebabCase";

describe("toKebabCase", () => {
    it("kebab-case remains kebab-case", () => {
        expect(toKebabCase("hello-world")).toBe("hello-world");
    });
    
    it("converts camelCase to kebab-case", () => {
        expect(toKebabCase("helloWorld")).toBe("hello-world");
    });

    it("converts PascalCase to kebab-case", () => {
        expect(toKebabCase("HelloWorld")).toBe("hello-world");
    });
});
