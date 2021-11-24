const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    async function waitForSelectors(selectors, frame) {
      for (const selector of selectors) {
        try {
          return await waitForSelector(selector, frame);
        } catch (err) {
          console.error(err);
        }
      }
      throw new Error('Could not find element for selectors: ' + JSON.stringify(selectors));
    }

    async function waitForSelector(selector, frame) {
      if (selector instanceof Array) {
        let element = null;
        for (const part of selector) {
          if (!element) {
            element = await frame.waitForSelector(part);
          } else {
            element = await element.$(part);
          }
          if (!element) {
            throw new Error('Could not find element: ' + part);
          }
          element = (await element.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
        }
        if (!element) {
          throw new Error('Could not find element: ' + selector.join('|'));
        }
        return element;
      }
      const element = await frame.waitForSelector(selector);
      if (!element) {
        throw new Error('Could not find element: ' + selector);
      }
      return element;
    }

    async function waitForElement(step, frame) {
      const count = step.count || 1;
      const operator = step.operator || '>=';
      const comp = {
        '==': (a, b) => a === b,
        '>=': (a, b) => a >= b,
        '<=': (a, b) => a <= b,
      };
      const compFn = comp[operator];
      await waitForFunction(async () => {
        const elements = await querySelectorsAll(step.selectors, frame);
        return compFn(elements.length, count);
      });
    }

    async function querySelectorsAll(selectors, frame) {
      for (const selector of selectors) {
        const result = await querySelectorAll(selector, frame);
        if (result.length) {
          return result;
        }
      }
      return [];
    }

    async function querySelectorAll(selector, frame) {
      if (selector instanceof Array) {
        let elements = [];
        let i = 0;
        for (const part of selector) {
          if (i === 0) {
            elements = await frame.$$(part);
          } else {
            const tmpElements = elements;
            elements = [];
            for (const el of tmpElements) {
              elements.push(...(await el.$$(part)));
            }
          }
          if (elements.length === 0) {
            return [];
          }
          const tmpElements = [];
          for (const el of elements) {
            const newEl = (await el.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
            if (newEl) {
              tmpElements.push(newEl);
            }
          }
          elements = tmpElements;
          i++;
        }
        return elements;
      }
      const element = await frame.$$(selector);
      if (!element) {
        throw new Error('Could not find element: ' + selector);
      }
      return element;
    }

    async function waitForFunction(fn) {
      let isActive = true;
      setTimeout(() => {
        isActive = false;
      }, 5000);
      while (isActive) {
        const result = await fn();
        if (result) {
          return;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      throw new Error('Timed out');
    }
    {
        const targetPage = page;
        await targetPage.setViewport({"width":736,"height":744})
    }
    {
        const targetPage = page;
        const promises = [];
        promises.push(targetPage.waitForNavigation());
        await targetPage.goto('https://coffee-cart.netlify.app/');
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Espresso Macchiato"],["#app > div:nth-child(3) > ul > li:nth-child(2) > div > div > div.cup-body"]], targetPage);
        await element.click({ offset: { x: 149.40188598632812, y: 104.6452407836914} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Mocha"],["#app > div:nth-child(3) > ul > li:nth-child(4) > div > div > div.cup-body"]], targetPage);
        await element.click({ offset: { x: 162.40188598632812, y: 80.25460815429688} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Cart page"],["#app > ul > li:nth-child(2) > a"]], targetPage);
        await element.click({ offset: { x: 37.1796875, y: 17.5} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Remove all Mocha"],["#app > div.list > div > ul > li:nth-child(3) > div:nth-child(4) > button"]], targetPage);
        await element.click({ offset: { x: 10, y: 13.140625} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Proceed to checkout"],["#app > div.list > div > button"]], targetPage);
        await element.click({ offset: { x: 157, y: 26.921875} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Name"],["#name"]], targetPage);
        await element.click({ offset: { x: 87.4140625, y: 5.90625} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Name"],["#name"]], targetPage);
        const type = await element.evaluate(el => el.type);
        if (["textarea","select-one","text","url","tel","search","password","number","email"].includes(type)) {
          await element.type('jane');
        } else {
          await element.focus();
          await element.evaluate((el, value) => {
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
          }, "jane");
        }
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Email"],["#email"]], targetPage);
        await element.click({ offset: { x: 40.40625, y: 19.2109375} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Email"],["#email"]], targetPage);
        const type = await element.evaluate(el => el.type);
        if (["textarea","select-one","text","url","tel","search","password","number","email"].includes(type)) {
          await element.type('jane@due.com');
        } else {
          await element.focus();
          await element.evaluate((el, value) => {
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
          }, "jane@due.com");
        }
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Submit"],["#app > div.list > div > div > div > form > div:nth-child(4) > button"]], targetPage);
        await element.click({ offset: { x: 39.953125, y: 24.8203125} });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Meta");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Shift");
    }

    await browser.close();
})();
