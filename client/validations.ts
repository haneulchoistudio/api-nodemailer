export class Text {
    constructor(public input: string) {
        this.input = input.trim()
    }

    public isEmpty() {
        return this.input ? true : false
    }

    public atLeast(min: number) {
        return this.input.length >= min ? true: false
    }

    public isEmail() {

        const lengthGreaterThan4 = this.atLeast(5)

        const hasAtSign = this.input.includes("@")

        const hasDotSign = this.input.includes(".")

        const splitByAtSign = this.input.split("@")

        const leftOnlyCharacters = splitByAtSign[0] && splitByAtSign[0].length >= 1 && !(splitByAtSign[0].includes("@") || splitByAtSign[0].includes(".")) ? true : false

        const rightHasDotSign = splitByAtSign[1] && splitByAtSign[1].length >= 1 && splitByAtSign[1].includes(".") ? true : false

        const rightSplitByDotSign = splitByAtSign[1].split(".")

        const rightLeftOnlyCharacters = rightSplitByDotSign[0] && rightSplitByDotSign[0].length >= 1 && !(rightSplitByDotSign[0].includes("@") || rightSplitByDotSign[0].includes(".")) ? true : false

        const rightRightOnlyChracters = rightSplitByDotSign[1] && rightSplitByDotSign[1].length >= 1 && !(rightSplitByDotSign[1].includes("@") || rightSplitByDotSign[1].includes(".")) ? true : false

        return [lengthGreaterThan4, hasAtSign, hasDotSign, splitByAtSign, leftOnlyCharacters, rightHasDotSign, rightSplitByDotSign, rightLeftOnlyCharacters, rightRightOnlyChracters].every(Boolean)
    }
}