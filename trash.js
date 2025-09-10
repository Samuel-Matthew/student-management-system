const students = [
    {
        name: 'Ekemini',
        age: 25,
        class: 'PHP'
    },
    {
        name: 'Destiny',
        age: 24,
        class: 'Javascript'
    },
    {
        name: 'Kelvin',
        age: 20,
        class: 'Python'
    },
    {
        name: 'Udeme',
        age: 22,
        class: 'Javascript'
    },
    {
        name: 'Keziah',
        age: 22,
        class: 'Cybersecurity'
    },
    {
        name: 'Abas',
        age: 2,
        class: 'Backend Developer'
    }
]


const response = await fetch('http://localhost:5502/students', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(studentDetails)
});

const result = await response.json();
console.log(studentDetails);