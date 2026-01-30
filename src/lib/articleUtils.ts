// Calculate reading time based on word count
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, readingTime);
};

// Get article image based on the title/subject
export const getArticleImage = (title: string): string => {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('yoshiaki tsutsumi')) {
    return 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&auto=format&fit=crop&q=60';
  }
  if (titleLower.includes('elizabeth holmes') || titleLower.includes('theranos')) {
    return 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=60';
  }
  if (titleLower.includes('sam bankman') || titleLower.includes('sbf') || titleLower.includes('ftx')) {
    return 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&auto=format&fit=crop&q=60';
  }
  if (titleLower.includes('hui ka yan') || titleLower.includes('evergrande')) {
    return 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60';
  }
  if (titleLower.includes('anil ambani') || titleLower.includes('reliance')) {
    return 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&auto=format&fit=crop&q=60';
  }
  
  // Default business/finance image
  return 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60';
};
