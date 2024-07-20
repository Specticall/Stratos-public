export function createImageFormData(imageBlob: File) {
  // Create form data
  const formData = new FormData();
  formData.append("image", imageBlob);

  // Create temporary URL
  const temporaryURL = URL.createObjectURL(imageBlob);

  return { formData, temporaryURL };
}
