var appendCount = 0; // Track the number of appends
    
function appendCode() {
  var codeInput = document.getElementById("codeInput");
  var codeValue = document.getElementById("codeValue");
  var codeType = document.getElementById("codeType");
  var codeOutput = document.getElementById("codeOutput");
  var codeStructure = codeInput.value;
  var valueCode = codeValue.value;
  var selectedType = codeType.value;

  // Static template code with placeholders
  var staticTemplateCode = `
var template = {
    version: "1.0.0",
    width: 300,
    height: 250,
    elements: {
`;
  // Dynamic templates based on the selected type
  var dynamicTemplateCode = "";
  if (selectedType === "Text") {
    dynamicTemplateCode = `
      ${codeStructure}: {
reportingDimension: "${codeStructure}",
text: { value: "${valueCode}" },
},`;
  } else if (selectedType === "Image") {
    dynamicTemplateCode = `
    ${codeStructure}: {
reportingDimension: "${codeStructure}",
image: { src: "${valueCode}" }
},
`;
  } else if (selectedType === "Trigger") {
    dynamicTemplateCode = `public class MyClass {
public static void main(String[] args) {
// Java template code
}
}
`;
  }

  var templateCode = "";

  if (appendCount === 0) {
    // First append, include the static template
    templateCode = staticTemplateCode.replace('{{codeStructure}}', dynamicTemplateCode);
  } else {
    // Subsequent appends, exclude the static template
    templateCode = dynamicTemplateCode;
  }

  // Create a new <pre> element to display the modified code
  var codeElement = document.createElement("pre");
  codeElement.textContent = templateCode;

  // Append the modified code to the output div
  codeOutput.appendChild(codeElement);

  // Increment the append count
  appendCount++;

  // Clear the input fields
  codeInput.value = "";
  codeType.value = "Text";
}

function clearCode() {
  var codeOutput = document.getElementById("codeOutput");
  codeOutput.innerHTML = "";
  appendCount = 0; // Reset the append count
}

function copyCode() {
  var codeOutput = document.getElementById("codeOutput");

  // Create a temporary textarea element to hold the code
  var textarea = document.createElement("textarea");
  textarea.value = codeOutput.textContent;

  // Append the textarea to the document
  document.body.appendChild(textarea);

  // Select the text within the textarea
  textarea.select();

  // Copy the selected text to the clipboard
  document.execCommand("copy");

  // Remove the temporary textarea
  document.body.removeChild(textarea);

  // Optionally, provide some visual feedback to the user
  alert("Code copied to clipboard!");
}