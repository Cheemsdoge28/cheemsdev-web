const BASE_URL = 'http://localhost:3000';

async function testValidateEndpoint() {
  console.log('🔑 Testing Validate-Key Endpoint');

  try {
    // Step 1: Generate a test API key
    console.log('1. Generating test API key...');
    const generateResponse = await fetch(`${BASE_URL}/api/keys/generate-api-key`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label: `Validate Test ${Date.now()}` }),
    });

    if (!generateResponse.ok) {
      throw new Error(`Failed to generate API key: ${generateResponse.status}`);
    }

    const generateData = await generateResponse.json();
    const apiKey = generateData.apiKey;
    console.log(`✅ Generated API key: ${apiKey.substring(0, 8)}...`);
    console.log(`📝 Label: ${generateData.label}`);

    // Step 2: Test the validate endpoint with the new key
    console.log('\n2. Testing /api/validate-key with valid key...');
    const validateResponse = await fetch(`${BASE_URL}/api/validate-key`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey }),
    });

    const validateData = await validateResponse.json();
    console.log(`Status: ${validateResponse.status}`);
    console.log('Response:', validateData);

    if (validateResponse.ok && validateData.valid) {
      console.log('✅ Valid API key correctly validated');
      console.log(`   Label: ${validateData.label}`);
      console.log(`   Created: ${validateData.createdAt}`);
    } else {
      console.log('❌ Valid API key failed validation');
    }

    // Step 3: Test with invalid key
    console.log('\n3. Testing /api/validate-key with invalid key...');
    const invalidResponse = await fetch(`${BASE_URL}/api/validate-key`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: 'invalid-key-123456789' }),
    });

    const invalidData = await invalidResponse.json();
    console.log(`Status: ${invalidResponse.status}`);
    console.log('Response:', invalidData);

    if (invalidResponse.status === 401 && !invalidData.valid) {
      console.log('✅ Invalid API key correctly rejected');
    } else {
      console.log('❌ Invalid API key was not rejected properly');
    }

    // Step 4: Test with malformed request
    console.log('\n4. Testing /api/validate-key with malformed request...');
    const malformedResponse = await fetch(`${BASE_URL}/api/validate-key`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wrongField: 'test' }),
    });

    const malformedData = await malformedResponse.json();
    console.log(`Status: ${malformedResponse.status}`);
    console.log('Response:', malformedData);

    if (malformedResponse.status === 400) {
      console.log('✅ Malformed request correctly rejected');
    } else {
      console.log('❌ Malformed request was not handled properly');
    }

    // Step 5: Cleanup - delete the test key
    console.log('\n5. Cleaning up test key...');
    const deleteResponse = await fetch(`${BASE_URL}/api/keys/delete-api-key`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey }),
    });

    if (deleteResponse.ok) {
      console.log('✅ Test key cleaned up successfully');
    } else {
      console.log('⚠️ Failed to cleanup test key');
    }

    console.log('\n🎉 Validate endpoint testing completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Run the test
testValidateEndpoint();
