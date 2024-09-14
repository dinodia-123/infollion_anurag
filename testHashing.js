const bcrypt = require('bcryptjs');

const testPassword = 'testPassword123'; // Example password

async function testHashing() {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(testPassword, 10);
        console.log('Hashed Password:', hashedPassword);

        // Compare the hashed password with the original password
        const isMatch = await bcrypt.compare(testPassword, hashedPassword);
        console.log('Password Match:', isMatch); // Should be true

        // Compare the hashed password with an incorrect password
        const isMatchFalse = await bcrypt.compare('wrongPassword', hashedPassword);
        console.log('Password Match with Wrong Password:', isMatchFalse); // Should be false

    } catch (error) {
        console.error('Error:', error);
    }
}

testHashing();
