const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=";
    const API_KEY = "AIzaSyDatSpfwiCDO4oEFsduF3_w5MerfyZQ8oQ"; 
    
    document.addEventListener('DOMContentLoaded', () => {
      const stack = document.getElementById('cardStack');
      const chevronBtn = document.querySelector('.chevron-btn');
      const registerBtn = document.querySelector('.register-btn');
      const modal = document.getElementById('registrationModal');
      const closeModal = document.getElementById('closeModal');
      const addProductBtn = document.getElementById('addProductBtn');
      const addProductModal = document.getElementById('addProductModal');
      const closeAddProductModal = document.getElementById('closeAddProductModal');
      const assistantBtn = document.querySelector('.assistant-btn');
      const assistantModal = document.getElementById('assistantModal');
      const closeAssistantModal = document.getElementById('closeAssistantModal');
      const socialMediaLink = document.getElementById('socialMediaLink');
      const socialMediaModal = document.getElementById('socialMediaModal');
      const closeSocialMediaModal = document.getElementById('closeSocialMediaModal');
      const compareLink = document.getElementById('compareLink');
      const compareModal = document.getElementById('compareModal');
      const closeCompareModal = document.getElementById('closeCompareModal');
      const productList = document.getElementById('productList');
      const contactBtn = document.getElementById("contactus");
      const contactModal = document.getElementById("contactModal");
      const closeContactBtn = document.getElementById("closeContactModal");
      const contactForm = document.getElementById("contactForm");
      const thankyouCard = document.getElementById("thankyouCard");
      const closeThankyouBtn = document.getElementById("closeThankou");
      const suggestLink = document.getElementById('suggestLink');
      const suggestModal = document.getElementById('suggestModal');
      const closeSuggestModal = document.getElementById('closeSuggestModal');
      const generateSuggestionsBtn = document.getElementById('generateSuggestionsBtn');
      const suggestedProductsGrid = document.getElementById('suggestedProductsGrid');

      // Add sample products if local storage is empty
      const sampleProducts = [
        {
          id: 1,
          name: "Hand-Painted Vase",
          category: "Pottery",
          material: "Ceramic",
          description: "A beautiful, hand-painted ceramic vase with a traditional motif.",
          price: "₹1500",
          imageUrl: "https://images.unsplash.com/photo-1573580296036-ef22f9cf31e2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM5fHx8ZW58MHx8fHx8"
        },
        {
          id: 2,
          name: "Woven Wool Scarf",
          category: "Textile",
          material: "Wool",
          description: "A soft, handwoven scarf made from 100% organic wool with natural dyes.",
          price: "₹850",
          imageUrl: "https://plus.unsplash.com/premium_photo-1679811677744-c48e8d887fa5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8"
        },
        {
          id: 3,
          name: "Wooden Trinket Box",
          category: "Woodwork",
          material: "Sheesham Wood",
          description: "An intricately carved wooden box perfect for storing small treasures.",
          price: "₹2100",
          imageUrl: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=900&auto=format&fit=crop&q=60"
        }
      ];

      if (!localStorage.getItem('artisanProducts')) {
        localStorage.setItem('artisanProducts', JSON.stringify(sampleProducts));
      }

      if (!stack || !chevronBtn) return;
    
      // Initialize: mark first card active and lock container height so layout doesn't jump
      const cards = Array.from(stack.querySelectorAll('.info-card'));
      if (cards.length === 0) return;
      const measure = (el) => {
        // Force layout to ensure accurate height when images are loaded
        return el.getBoundingClientRect().height;
      };
      const setActive = (index) => {
        cards.forEach((c, i) => c.classList.toggle('active', i === index));
        // adjust stack min-height to active card's height
        const activeCard = cards[index];
        if (activeCard) {
          const h = measure(activeCard);
          // Set both min-height and explicit height to avoid overflow/collapse
          stack.style.minHeight = h + 'px';
          stack.style.height = h + 'px';
        }
      };
      let current = 0;
      setActive(current);
    
      const rotateCards = () => {
        current = (current + 1) % cards.length;
        setActive(current);
      };
    
      chevronBtn.addEventListener('click', rotateCards);
    
      // Modal functionality
      const showModal = (modalElement) => {
        modalElement.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
      };
    
      const hideModal = (modalElement) => {
        modalElement.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
      };
    
      // Event listeners for registration modal
      if (registerBtn) {
        registerBtn.addEventListener('click', (e) => {
          e.preventDefault();
          loadUserProducts();
          showModal(modal);
        });
      }
    
      if (closeModal) {
        closeModal.addEventListener('click', () => hideModal(modal));
      }
    
      // Close registration modal when clicking outside
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            hideModal(modal);
          }
        });
      }
    
      // Event listeners for add product modal
      if (addProductBtn) {
        addProductBtn.addEventListener('click', (e) => {
          e.preventDefault();
          hideModal(modal);
          resetAddProductForm();
          showModal(addProductModal);
        });
      }
    
      if (closeAddProductModal) {
        closeAddProductModal.addEventListener('click', () => hideModal(addProductModal));
      }
    
      // Close add product modal when clicking outside
      if (addProductModal) {
        addProductModal.addEventListener('click', (e) => {
          if (e.target === addProductModal) {
            hideModal(addProductModal);
          }
        });
      }
    
      // Event listeners for assistant modal
      if (assistantBtn) {
        assistantBtn.addEventListener('click', (e) => {
          e.preventDefault();
          showModal(assistantModal);
        });
      }
    
      if (closeAssistantModal) {
        closeAssistantModal.addEventListener('click', () => hideModal(assistantModal));
      }
    
      // Close assistant modal when clicking outside
      if (assistantModal) {
        assistantModal.addEventListener('click', (e) => {
          if (e.target === assistantModal) {
            hideModal(assistantModal);
          }
        });
      }
    
      // Event listeners for social media modal
      if (socialMediaLink) {
        socialMediaLink.addEventListener('click', (e) => {
          e.preventDefault();
          showModal(socialMediaModal);
        });
      }
    
      if (closeSocialMediaModal) {
        closeSocialMediaModal.addEventListener('click', () => hideModal(socialMediaModal));
      }
    
      // Close social media modal when clicking outside
      if (socialMediaModal) {
        socialMediaModal.addEventListener('click', (e) => {
          if (e.target === socialMediaModal) {
            hideModal(socialMediaModal);
          }
        });
      }
    
      // Event listeners for compare modal
      if (compareLink) {
        compareLink.addEventListener('click', (e) => {
          e.preventDefault();
          showModal(compareModal);
        });
      }
    
      if (closeCompareModal) {
        closeCompareModal.addEventListener('click', () => hideModal(compareModal));
      }
    
      // Close compare modal when clicking outside
      if (compareModal) {
        compareModal.addEventListener('click', (e) => {
          if (e.target === compareModal) {
            hideModal(compareModal);
          }
        });
      }
      
      // Contact modal
      if (contactBtn) {
        contactBtn.addEventListener("click", () => {
          showModal(contactModal);
        });
      }
      if (closeContactBtn) {
        closeContactBtn.addEventListener("click", () => {
          hideModal(contactModal);
        });
      }
      if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
          e.preventDefault();
          hideModal(contactModal);
          showModal(thankyouCard);
          contactForm.reset();
        });
      }
      if (closeThankyouBtn) {
        closeThankyouBtn.addEventListener("click", () => {
          hideModal(thankyouCard);
        });
      }
    
      // Suggest Modal listeners
      if (suggestLink) {
        suggestLink.addEventListener('click', (e) => {
            e.preventDefault();
            showModal(suggestModal);
        });
      }
    
      if (closeSuggestModal) {
        closeSuggestModal.addEventListener('click', () => hideModal(suggestModal));
      }
    
      // Close modals with Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          const modals = [modal, addProductModal, assistantModal, socialMediaModal, compareModal, contactModal, thankyouCard, suggestModal];
          modals.forEach(m => {
            if (m && m.classList.contains('show')) {
              hideModal(m);
            }
          });
        }
      });
    
      // Gemini API Integration
      async function generateContentWithGemini(prompt) {
          const payload = {
              contents: [{ parts: [{ text: prompt }] }],
              systemInstruction: {
                  parts: [{ text: "You are an expert artisan marketplace assistant. Provide concise, helpful, and polite responses." }]
              }
          };
    
          try {
              const response = await fetch(GEMINI_API_URL + API_KEY, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload)
              });
              if (!response.ok) {
                  console.error(`API call failed with status: ${response.status}`, await response.text());
                  throw new Error(`API call failed with status: ${response.status}`);
              }
              const result = await response.json();
              return result.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response. Please try again.";
          } catch (error) {
              console.error('Error calling Gemini API:', error);
              return "I'm sorry, I encountered an error. Please try again later.";
          }
      }
    
      async function generateStructuredContentWithGemini(prompt, schema) {
          const payload = {
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                  responseMimeType: "application/json",
                  responseSchema: schema
              }
          };
          try {
              const response = await fetch(GEMINI_API_URL + API_KEY, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload)
              });
              if (!response.ok) {
                  console.error(`API call failed with status: ${response.status}`, await response.text());
                  throw new Error(`API call failed with status: ${response.status}`);
              }
              const result = await response.json();
              if (result.candidates && result.candidates.length > 0 && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts.length > 0) {
                  const json = result.candidates[0].content.parts[0].text;
                  return JSON.parse(json);
              }
              return null;
          } catch (error) {
              console.error('Error calling Gemini API for structured content:', error);
              return null;
          }
      }
    
      // Add Product form functionality
      const generateDescBtn = document.getElementById('generateDescBtn');
      const suggestPriceBtn = document.getElementById('suggestPriceBtn');
      const saveProductBtn = document.getElementById('saveProductBtn');
      const uploadBtn = document.getElementById('uploadBtn');
    
      if (generateDescBtn) {
        generateDescBtn.addEventListener('click', async () => {
          const name = document.getElementById('productName').value.trim();
          const category = document.getElementById('productCategory').value.trim();
          const material = document.getElementById('productMaterial').value.trim();
          const descResult = document.getElementById('aiDescription');
          if (!name || !category || !material) {
              descResult.textContent = 'Please fill in product details.';
              return;
          }
          generateDescBtn.textContent = 'Generating...';
          generateDescBtn.disabled = true;
    
          const prompt = `Generate a compelling description for a handcrafted product with the following details:
          Name: ${name}
          Category: ${category}
          Material: ${material}
          Make the description concise, engaging, and suitable for an artisan marketplace website. Do not add any headings or titles.`;
    
          const description = await generateContentWithGemini(prompt);
          descResult.textContent = `"${description}"`;
          generateDescBtn.textContent = 'Generate AI Description ✨';
          generateDescBtn.disabled = false;
        });
      }
    
      if (suggestPriceBtn) {
        suggestPriceBtn.addEventListener('click', async () => {
          const name = document.getElementById('productName').value.trim();
          const category = document.getElementById('productCategory').value.trim();
          const material = document.getElementById('productMaterial').value.trim();
          const priceResult = document.getElementById('priceSuggestion');
          if (!name || !category || !material) {
              priceResult.textContent = 'Please fill in product details.';
              return;
          }
          suggestPriceBtn.textContent = 'Analyzing...';
          suggestPriceBtn.disabled = true;
    
          const prompt = `Based on a product with the following details, suggest a realistic and competitive price range in Indian Rupees (₹).
          Name: ${name}
          Category: ${category}
          Material: ${material}
          Please provide a single number, like "₹850" and nothing else.`;
    
          const price = await generateContentWithGemini(prompt);
          priceResult.textContent = `Suggested Price: ${price}`;
          suggestPriceBtn.textContent = 'Suggest Price ✨';
          suggestPriceBtn.disabled = false;
        });
      }
    
      const resetAddProductForm = () => {
          document.getElementById('productId').value = '';
          document.getElementById('productName').value = '';
          document.getElementById('productCategory').value = 'Handicraft';
          document.getElementById('productMaterial').value = '';
          document.getElementById('aiDescription').textContent = '';
          document.getElementById('priceSuggestion').textContent = '';
          uploadBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="upload-icon"><path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z"/></svg> Upload Button`;
          uploadBtn.style.background = 'var(--brand)';
          saveProductBtn.textContent = 'Save Product';
          saveProductBtn.disabled = false;
      };
    
      if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
          const fileInput = document.createElement('input');
          fileInput.type = 'file';
          fileInput.accept = 'image/*';
          fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = function(e) {
                uploadBtn.innerHTML = `
                  <img src="${e.target.result}" alt="Uploaded image" style="width: 20px; height: 20px; object-fit: cover; border-radius: 4px;">
                  ${file.name}
                `;
                uploadBtn.style.background = 'var(--accent)';
              };
              reader.readAsDataURL(file);
            }
          });
          fileInput.click();
        });
      }
    
      let savedProducts = JSON.parse(localStorage.getItem('artisanProducts')) || [];
    
      const saveProduct = (productData) => {
        const id = productData.id || Date.now();
        const existingIndex = savedProducts.findIndex(p => p.id === id);
        
        const newProduct = {
            id,
            ...productData,
            createdAt: new Date().toISOString()
        };
        
        if (existingIndex > -1) {
            savedProducts[existingIndex] = newProduct;
        } else {
            savedProducts.push(newProduct);
        }
        localStorage.setItem('artisanProducts', JSON.stringify(savedProducts));
      };
    
      const loadUserProducts = () => {
          productList.innerHTML = '';
          if (savedProducts.length === 0) {
              productList.innerHTML = `<div class="product-item">No products saved.</div>`;
              return;
          }
          savedProducts.forEach(product => {
              const item = document.createElement('div');
              item.className = 'product-item';
              item.innerHTML = `
                <span class="product-name">${product.name}</span>
                <span class="product-status">(AI Desc ✓, Price ✓)</span>
              `;
              productList.appendChild(item);
          });
      };
    
      if (saveProductBtn) {
        saveProductBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const id = document.getElementById('productId').value;
          const name = document.getElementById('productName').value;
          const category = document.getElementById('productCategory').value;
          const material = document.getElementById('productMaterial').value;
          const description = document.getElementById('aiDescription').textContent;
          const price = document.getElementById('priceSuggestion').textContent;
          const imageUrl = uploadBtn.querySelector('img') ? uploadBtn.querySelector('img').src : null;
    
          if (!name || !category || !material) {
            // Replace alert with a more user-friendly message box
            const messageBox = document.createElement('div');
            messageBox.className = 'message-box';
            messageBox.innerHTML = `
              <div class="message-content">
                <p>Please fill in all required fields.</p>
                <button onclick="this.parentElement.parentElement.remove()">OK</button>
              </div>
            `;
            document.body.appendChild(messageBox);
            return;
          }
    
          saveProductBtn.textContent = 'Saving...';
          saveProductBtn.disabled = true;
    
          setTimeout(() => {
            const productData = { name, category, material, description, price, imageUrl, id: id || null };
            saveProduct(productData);
    
            // Replace alert with a more user-friendly message box
            const messageBox = document.createElement('div');
            messageBox.className = 'message-box';
            messageBox.innerHTML = `
              <div class="message-content">
                <p>Product "${name}" saved successfully!</p>
                <button onclick="this.parentElement.parentElement.remove()">OK</button>
              </div>
            `;
            document.body.appendChild(messageBox);
    
            hideModal(addProductModal);
            loadUserProducts();
            showModal(modal);
    
            resetAddProductForm();
          }, 1500);
        });
      }
    
      // Social Media Generator Functionality
      const generatePostBtn = document.getElementById('generatePostBtn');
      const ideaCard = document.getElementById('ideaCard');
      const loader = document.getElementById('loader');
      const placeholder = document.getElementById('socialPlaceholder');
      const closeCardBtn = document.getElementById('closeCardBtn');
      const ideaTitle = document.getElementById('ideaTitle');
      const ideaPlatform = document.getElementById('ideaPlatform');
      const ideaCategory = document.getElementById('ideaCategory');
      const ideaPostType = document.getElementById('ideaPostType');
      const ideaDescriptionText = document.getElementById('ideaDescriptionText');
      const likes = document.getElementById('likes');
      const shares = document.getElementById('shares');
      const engagement = document.getElementById('engagement');

      generatePostBtn.addEventListener('click', async () => {
        ideaCard.classList.remove('show');
        placeholder.style.display = 'none';
        loader.classList.add('show');
        generatePostBtn.disabled = true;
        generatePostBtn.textContent = 'Generating...';

        const prompt = `You are a social media strategist specializing in Instagram, Twitter, and LinkedIn. Generate a single, highly effective social media post idea. The idea must include:
        1. A concise, catchy title.
        2. The primary platform (choose one: "Instagram", "Twitter", or "LinkedIn").
        3. A category (choose one: "Engagement", "Reach", or "Conversion").
        4. A short description of the post idea, providing a specific and actionable example.
        5. An effective post type (e.g., "Behind-the-scenes video", "Product carousel", "Infographic").
        6. Realistic example stats/metrics for a successful post of this type, including 'likes', 'shares', and 'engagement' percentage.

        Return the response as a single JSON object with keys: "title", "platform", "category", "description", "effectivePostType", and a "stats" object containing "likes", "shares", and "engagement".`;
        
        const socialIdeaSchema = {
            type: "OBJECT",
            properties: {
              title: { type: "STRING" },
              platform: { type: "STRING" },
              category: { type: "STRING" },
              description: { type: "STRING" },
              effectivePostType: { type: "STRING" },
              stats: {
                  type: "OBJECT",
                  properties: {
                      likes: { type: "NUMBER" },
                      shares: { type: "NUMBER" },
                      engagement: { type: "NUMBER" }
                  }
              }
            }
        };

        try {
            const data = await generateStructuredContentWithGemini(prompt, socialIdeaSchema);
            if (data) {
                ideaTitle.textContent = data.title;
                ideaPlatform.textContent = data.platform;
                ideaCategory.textContent = data.category;
                ideaPostType.textContent = data.effectivePostType || "N/A";
                ideaDescriptionText.textContent = data.description;
                likes.textContent = data.stats.likes.toLocaleString();
                shares.textContent = data.stats.shares.toLocaleString();
                engagement.textContent = `${data.stats.engagement}%`;
                
                // Set color based on platform
                ideaPlatform.className = '';
                if (data.platform) {
                    ideaPlatform.classList.add(`platform-${data.platform.toLowerCase()}`);
                }
                
                ideaCard.classList.add('show');
                placeholder.style.display = 'none';
            } else {
                showMessage('Failed to generate social media idea. Please try again.');
                placeholder.style.display = 'block';
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('An error occurred while generating the idea. Please try again later.');
            placeholder.style.display = 'block';
        } finally {
            loader.classList.remove('show');
            generatePostBtn.disabled = false;
            generatePostBtn.textContent = 'Generate New Idea ✨';
        }
      });
      
      closeCardBtn.addEventListener('click', () => {
          ideaCard.classList.remove('show');
          placeholder.style.display = 'block';
      });

      // Old social media functions removed.
      
      // Comparison Functionality
      const generateComparisonBtn = document.getElementById('generateComparison');
      const comparisonResults = document.getElementById('comparisonResults');
    
      if (generateComparisonBtn) {
          generateComparisonBtn.addEventListener('click', async () => {
              const name = document.getElementById('compareName').value;
              const category = document.getElementById('compareCategory').value;
              const material = document.getElementById('compareMaterial').value;
              const price = document.getElementById('comparePrice').value;
              const description = document.getElementById('compareDescription').value;
    
              if (!name || !category || !material || !price || !description) {
                  // Replace alert with a more user-friendly message box
                  const messageBox = document.createElement('div');
                  messageBox.className = 'message-box';
                  messageBox.innerHTML = `
                    <div class="message-content">
                      <p>Please fill in all comparison fields.</p>
                      <button onclick="this.parentElement.parentElement.remove()">OK</button>
                    </div>
                  `;
                  document.body.appendChild(messageBox);
                  return;
              }
    
              generateComparisonBtn.textContent = 'Generating...';
              generateComparisonBtn.disabled = true;
              comparisonResults.style.display = 'none';
    
              const prompt = `You are a market analysis expert for handcrafted goods. I will provide details about an artisan product and your task is to generate a realistic market alternative and a detailed analysis comparing the two. Provide the response as a JSON object that includes a "marketProduct" and a detailed "analysis". The marketProduct should include a name, category, material, description, price, and an image URL. The analysis should include a priceAnalysis, featureAnalysis, marketPosition, and recommendations. Provide a numerical similarityScore (0-100) and a numerical priceDifference. The response MUST be a valid JSON object and nothing else.
    
              User Product Details:
              Name: ${name}
              Category: ${category}
              Material: ${material}
              Price: ${price}
              Description: ${description}`;
    
              const comparisonSchema = {
                  type: "OBJECT",
                  properties: {
                      marketProduct: {
                          type: "OBJECT",
                          properties: {
                              name: { type: "STRING" },
                              category: { type: "STRING" },
                              material: { type: "STRING" },
                              description: { type: "STRING" },
                              price: { type: "STRING" },
                              imageUrl: { type: "STRING" }
                          }
                      },
                      analysis: {
                          type: "OBJECT",
                          properties: {
                              priceAnalysis: { type: "STRING" },
                              featureAnalysis: { type: "STRING" },
                              marketPosition: { type: "STRING" },
                              recommendations: { type: "STRING" }
                          }
                      },
                      similarityScore: { type: "NUMBER" },
                      priceDifference: { type: "NUMBER" }
                  }
              };
    
              const comparisonData = await generateStructuredContentWithGemini(prompt, comparisonSchema);
              
              if (comparisonData) {
                  const { marketProduct, analysis, similarityScore, priceDifference } = comparisonData;
                  document.getElementById('userProductCard').innerHTML = `
                      <div class="product-image">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="product-image-placeholder"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
                      </div>
                      <div class="product-info">
                          <h3>${name}</h3>
                          <div class="product-category">${category}</div>
                          <div class="product-material">${material}</div>
                          <div class="product-description">${description}</div>
                          <div class="product-price">${price}</div>
                      </div>
                  `;
                  
                  document.getElementById('marketProductCard').innerHTML = `
                      <div class="product-image">
                          <img src="${marketProduct.imageUrl}" alt="${marketProduct.name}">
                      </div>
                      <div class="product-info">
                          <h3>${marketProduct.name}</h3>
                          <div class="product-category">${marketProduct.category}</div>
                          <div class="product-material">${marketProduct.material}</div>
                          <div class="product-description">${marketProduct.description}</div>
                          <div class="product-price">${marketProduct.price}</div>
                      </div>
                  `;
                  
                  document.getElementById('priceAnalysis').innerHTML = `<p>${analysis.priceAnalysis}</p>`;
                  document.getElementById('featureAnalysis').innerHTML = `<p>${analysis.featureAnalysis}</p>`;
                  document.getElementById('marketAnalysis').innerHTML = `<p>${analysis.marketPosition}</p>`;
                  document.getElementById('recommendations').innerHTML = `<p>${analysis.recommendations}</p>`;
                  
                  document.getElementById('similarityScore').textContent = `${similarityScore}%`;
                  document.getElementById('priceDifference').textContent = `₹${priceDifference}`;
                  
                  comparisonResults.style.display = 'block';
              } else {
                  // Replace alert with a more user-friendly message box
                  const messageBox = document.createElement('div');
                  messageBox.className = 'message-box';
                  messageBox.innerHTML = `
                    <div class="message-content">
                      <p>Failed to generate comparison. Please check your inputs and try again.</p>
                      <button onclick="this.parentElement.parentElement.remove()">OK</button>
                    </div>
                  `;
                  document.body.appendChild(messageBox);
              }
    
              generateComparisonBtn.textContent = 'Generate Comparison ✨';
              generateComparisonBtn.disabled = false;
          });
      }
    
      // Assistant chat functionality
      const chatInput = document.getElementById('chatInput');
      const sendMessage = document.getElementById('sendMessage');
      const chatMessages = document.getElementById('chatMessages');
    
      const addMessage = (message, isCustomer = true) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isCustomer ? 'customer' : 'bot'}`;
    
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = `<strong>${isCustomer ? 'Customer' : 'Bot'}:</strong> ${message}`;
    
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
    
        chatMessages.scrollTop = chatMessages.scrollHeight;
      };
    
      const sendChatMessage = async () => {
        const message = chatInput.value.trim();
        if (!message) return;
        addMessage(message, true);
        chatInput.value = '';
        sendMessage.disabled = true;
    
        const response = await generateContentWithGemini(`Respond to the user as a helpful customer service bot for an artisan marketplace.
        User: ${message}`);
    
        addMessage(response, false);
        sendMessage.disabled = false;
        chatInput.focus();
      };
    
      if (sendMessage && chatInput) {
        sendMessage.addEventListener('click', sendChatMessage);
        chatInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            sendChatMessage();
          }
        });
      }
      
      // Suggestion functionality
      if (generateSuggestionsBtn) {
        generateSuggestionsBtn.addEventListener('click', async () => {
            generateSuggestionsBtn.textContent = 'Generating ideas...';
            generateSuggestionsBtn.disabled = true;
            suggestedProductsGrid.innerHTML = '';
    
            const prompt = `You are a market trend analyst for handcrafted artisan products in India. Your task is to generate a list of 4 unique and trending product ideas. Each idea must include a name, a concise description, a main material, a realistic price range in Indian Rupees (e.g., "₹850 - ₹1200"), and a placeholder image URL. The response MUST be a valid JSON object with a single key "products" which is an array of these product objects. Do not add any extra text outside the JSON.`;
    
            const suggestionSchema = {
              type: "OBJECT",
              properties: {
                products: {
                  type: "ARRAY",
                  items: {
                    type: "OBJECT",
                    properties: {
                      name: { type: "STRING" },
                      description: { type: "STRING" },
                      material: { type: "STRING" },
                      price: { type: "STRING" },
                      imageUrl: { type: "STRING" }
                    }
                  }
                }
              }
            };
    
            const responseData = await generateStructuredContentWithGemini(prompt, suggestionSchema);
            
            if (responseData && responseData.products) {
                responseData.products.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.className = 'product-card';
                    productCard.innerHTML = `
                      <div class="product-image">
                        <img src="${product.imageUrl}" alt="${product.name}" onerror="this.onerror=null;this.src='https://placehold.co/300x200/27455a/f7efe6?text=Image+Not+Found';">
                      </div>
                      <div class="product-info">
                        <h3>${product.name}</h3>
                        <div class="product-material">${product.material}</div>
                        <div class="product-description">${product.description}</div>
                        <div class="product-price">${product.price}</div>
                      </div>
                    `;
                    suggestedProductsGrid.appendChild(productCard);
                });
            } else {
                suggestedProductsGrid.innerHTML = `<div class="empty-state" style="grid-column: 1 / -1;">
                    <p>Sorry, I couldn't generate product suggestions right now. Please try again.</p>
                </div>`;
            }
    
            generateSuggestionsBtn.textContent = 'Get Trending Product Ideas';
            generateSuggestionsBtn.disabled = false;
        });
      }
    
      // Recalc on window resize
      window.addEventListener('resize', () => setActive(current));
      cards.forEach(card => {
        card.querySelectorAll('img').forEach(img => {
          if (img.complete) return;
          img.addEventListener('load', () => setActive(current));
          img.addEventListener('error', () => setActive(current));
        });
      });
    });
