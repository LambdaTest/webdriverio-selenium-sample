describe('LambdaTest Drag & Drop Sliders', () => {
    it('should drag the slider to 95', async () => {
        // 1. Open URL and Click "Drag & Drop Sliders"
        await browser.url('https://www.lambdatest.com/selenium-playground');
        const dragDropLink = await $('=Drag & Drop Sliders'); // Using link text selector
        await dragDropLink.click();

        // 2. Select the slider "Default value 15" and drag the bar to make it 95
        // You MUST inspect the page to get the correct locator for the slider input and its output value.
        // Assuming a structure like <input type="range" ...> and <output ...>
        const sliderInput = await $('//input[@type="range" and @value="15"]'); // Example XPath, verify on page
        const sliderOutput = await $('//input[@type="range" and @value="15"]/following-sibling::output'); // Example XPath for the displayed value

        // WebdriverIO's dragAndDrop command can take an element or { x, y } coordinates.
        // For sliders, it's often more reliable to calculate the offset or use `setValue` if applicable.
        // Let's try dragging by an offset. This is approximate and might need fine-tuning.
        // A common slider value range is 0-100. Moving from 15 to 95 is a change of 80 units.
        // You'll need to estimate the pixel width of the slider track.
        // If the slider track is, say, 200px wide, then 80 units change would be (80/100) * 200 = 160px.

        const targetValue = 95;
        // The `setValue` command for range inputs directly sets the value.
        // This is usually more robust than pixel-based dragAndDrop for sliders.
        await sliderInput.setValue(targetValue.toString());

        // You might need a small pause or explicit wait for the UI to update
        await browser.pause(500); // Bad practice, use explicit waits in real code

        // 3. Validate whether the range value shows 95
        await expect(sliderOutput).toHaveText(targetValue.toString());
        console.log(`Slider value validated: '${await sliderOutput.getText()}'`);
    });
});