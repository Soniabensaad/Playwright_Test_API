const { test, expect } = require('@playwright/test');

let userid;  // Global variable to store user ID

// Test to get users
test('Get Users', async ({ request }) => {
    const res = await request.get('https://reqres.in/api/users?page=2');
    console.log(await res.json());
    expect(res.status()).toBe(200);
});

// Test to create a user
test('Create User', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/users', {
        data: {
            name: "John Moe",
            job: "Software Engineer"
        },
        headers: {
            "Accept": "application/json",
        }
    });
    
    const resJson = await response.json();
    console.log(resJson);
    expect(response.status()).toBe(201);
    userid = resJson.id;  // Save the user ID for later tests
});

// Test to update the user
test('Update User', async ({ request }) => {
    if (!userid) throw new Error("User ID not set");

    const response = await request.put(`https://reqres.in/api/users/${userid}`, {
        data: {
            name: "pava",
            job: "trainer"
        },
        headers: {
            "Accept": "application/json",
        }
    });
    
    const resJson = await response.json();
    console.log(resJson);
    expect(response.status()).toBe(200);
});

// Test to delete the user
test('Delete User', async ({ request }) => {
    if (!userid) throw new Error("User ID not set");

    const del = await request.delete(`https://reqres.in/api/users/${userid}`);
    expect(del.status()).toBe(204);  // Expecting a 204 status for successful deletion
});
