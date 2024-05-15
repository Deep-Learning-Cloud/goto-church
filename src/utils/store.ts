type GenerateRequest = {
  id: string;
  createdAt: string;
  input?: string;
  results?: string[];
};

export async function getGenerateRequests(): Promise<GenerateRequest[]> {
  return JSON.parse(localStorage.getItem("generateRequests") ?? "[]") || [];
}

export async function getGenerateRequest(
  id: string,
): Promise<GenerateRequest | undefined> {
  return (await getGenerateRequests()).find(
    (generateRequest) => generateRequest.id === id,
  );
}

export async function saveGenerateRequest(
  generateRequest: GenerateRequest,
): Promise<string> {
  const generateRequests = await getGenerateRequests();
  const index = generateRequests.findIndex(
    (request) => request.id === generateRequest.id,
  );

  if (index === -1) {
    generateRequests.push(generateRequest);
  } else {
    generateRequests[index] = generateRequest;
  }

  localStorage.setItem("generateRequests", JSON.stringify(generateRequests));

  return generateRequest.id;
}
