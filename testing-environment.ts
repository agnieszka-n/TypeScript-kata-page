import { ArrayAssertions } from "./array-assertions";

export interface TestCase {
  params: any[];
  expectedResult: any;
}

export function executeTestCases(testCases: TestCase[], functionUnderTest: Function, testCallback: (actualResult: any, expectedResult: any) => boolean, titlePrefix: string) {
  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    const actualResult = functionUnderTest.apply(undefined, testCase.params);
    const title = `${titlePrefix} (${i + 1}), params: ${testCase.params}`;
    Assert.assertTrue(title, testCallback(actualResult, testCase.expectedResult), `${title} - Expected: ${testCase.expectedResult}, but was: ${actualResult}.`);
  }
}

export class Assert {
  static assertTrue(title: string, testExpression: boolean, failMessage?: string) {
    const testsRoot = document.getElementById('testResults');
    const currentTestElement = document.createElement('li');
    currentTestElement.classList.add('test');

    testsRoot.appendChild(currentTestElement);

    if (testExpression) {
      currentTestElement.innerText = title;
      currentTestElement.classList.add('test-passed');
    }
    else {
      currentTestElement.innerText = failMessage ? failMessage : title;
      currentTestElement.classList.add('test-failed');
    }
  }

  static assertFalse(title: string, testExpression: boolean, failMessage?: string) {
    Assert.assertTrue(title, !testExpression, failMessage);
  }

  static assertEqual(title: string, first: any, second: any) {
    const actualTitle = title ? title : `${first} === ${second}`;

    Assert.assertTrue(actualTitle, first === second, `${actualTitle} - Expected ${first} to equal ${second}.`);
  }

  static assertArrayItemsEqual(title: string, first: any[], second: any[]) {
    const actualTitle = title ? title : `${first} === ${second}`;

    Assert.assertTrue(actualTitle, ArrayAssertions.areArrayItemsEqual(first, second), `${actualTitle} - Expected [${first}] to equal [${second}].`);
  }
}