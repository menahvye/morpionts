import rewire from "rewire"
const morpion = rewire("../morpion")
const getWinner = morpion.__get__("getWinner")
const getOwner = morpion.__get__("getOwner")
// @ponicode
describe("getWinner", () => {
    test("0", () => {
        let result: any = getWinner("da7588892")
        expect(result).toMatchSnapshot()
    })

    test("1", () => {
        let result: any = getWinner("12345")
        expect(result).toMatchSnapshot()
    })

    test("2", () => {
        let result: any = getWinner("c466a48309794261b64a4f02cfcc3d64")
        expect(result).toMatchSnapshot()
    })

    test("3", () => {
        let result: any = getWinner("9876")
        expect(result).toMatchSnapshot()
    })

    test("4", () => {
        let result: any = getWinner("bc23a9d531064583ace8f67dad60f6bb")
        expect(result).toMatchSnapshot()
    })

    test("5", () => {
        let result: any = getWinner("")
        expect(result).toMatchSnapshot()
    })
})

// @ponicode
describe("getOwner", () => {
    test("0", () => {
        let result: any = getOwner([0, 30, 30, 4])
        expect(result).toMatchSnapshot()
    })

    test("1", () => {
        let result: any = getOwner([5, 5, 0, 3.0])
        expect(result).toMatchSnapshot()
    })

    test("2", () => {
        let result: any = getOwner([10, 30, 4, 10])
        expect(result).toMatchSnapshot()
    })

    test("3", () => {
        let result: any = getOwner([0, 0, 10, 3.0])
        expect(result).toMatchSnapshot()
    })

    test("4", () => {
        let result: any = getOwner([30, 5, 30, 5])
        expect(result).toMatchSnapshot()
    })

    test("5", () => {
        let result: any = getOwner([])
        expect(result).toMatchSnapshot()
    })
})
