let expCount = 0;
let eduCount = 0;
let expertiseCount = 0;
let langCount = 0;
let globalSkillCount = 0;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('preview-experience').innerHTML = '';
    document.getElementById('preview-education').innerHTML = '';
    document.getElementById('preview-expertise').innerHTML = '';
    document.getElementById('preview-language').innerHTML = '';
    document.getElementById('preview-skills').innerHTML = '';

    addEducation();
    addExperience();
    addSkill();
    addExpertise();
    addLanguage();
    
    updatePreview('name', 'preview-name', 'Jane Doe');
    updatePreview('title', 'preview-title', 'Senior Web Developer');
    updatePreview('phone', 'preview-phone-text', '+1 (555) 123-4567');
    updatePreview('email', 'preview-email-text', 'jane.doe@example.com');
    updatePreview('location', 'preview-location-text', 'San Francisco, CA');
});

function updatePreview(inputId, previewId, placeholder = '') {
    const inputElement = document.getElementById(inputId);
    const previewElement = document.getElementById(previewId);
    if (inputElement && previewElement) {
        previewElement.innerText = inputElement.value || placeholder;
    } else if (previewElement) {
        previewElement.innerText = placeholder;
    }
}

function updatePhoto() {
    const input = document.getElementById('photo');
    const preview = document.getElementById('preview-image');
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function addExperience() {
    expCount++;
    const id = expCount;
    const formHtml = `
        <div id="exp-form-${id}" class="border p-4 rounded-lg space-y-2 relative">
            <button onclick="removeElement('exp-form-${id}', 'exp-preview-${id}')" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">&times;</button>
            <input type="text" placeholder="Job Title" class="p-2 border rounded-lg w-full" oninput="updateExperience(${id})">
            <input type="text" placeholder="Company Name" class="p-2 border rounded-lg w-full" oninput="updateExperience(${id})">
            <input type="text" placeholder="e.g., Jan 2020 - Present" class="p-2 border rounded-lg w-full" oninput="updateExperience(${id})">
            <textarea placeholder="e.g., Developed new features..." class="p-2 border rounded-lg w-full h-24" oninput="updateExperience(${id})"></textarea>
        </div>
    `;
    document.getElementById('experience-forms').insertAdjacentHTML('beforeend', formHtml);

    const previewHtml = `
        <div id="exp-preview-${id}" class="text-sm">
            <h4 class="font-semibold text-gray-800">Software Engineer</h4>
            <div class="flex justify-between text-gray-600 text-xs italic">
                <span>Tech Solutions Inc.</span>
                <span>Jan 2021 - Present</span>
            </div>
            <ul class="list-disc list-outside ml-5 text-gray-700 mt-1 space-y-1">
                <li>Developed and maintained web applications.</li>
            </ul>
        </div>
    `;
    document.getElementById('preview-experience').insertAdjacentHTML('beforeend', previewHtml);
    updateExperience(id);
}


function updateExperience(id) {
    const form = document.getElementById(`exp-form-${id}`);
    const preview = document.getElementById(`exp-preview-${id}`);
    if (!form || !preview) return;

    const [title, company, dates, desc] = form.querySelectorAll('input, textarea');
    
    preview.querySelector('h4').innerText = title.value || 'Software Engineer';
    preview.querySelector('span:first-child').innerText = company.value || 'Tech Solutions Inc.';
    preview.querySelector('span:last-child').innerText = dates.value || 'Jan 2021 - Present';
    
    const descList = preview.querySelector('ul');
    const responsibilities = desc.value.split('\n').filter(line => line.trim() !== '');
    if (responsibilities.length > 0) {
        descList.innerHTML = responsibilities.map(item => `<li>${item}</li>`).join('');
    } else {
        descList.innerHTML = '<li>Developed and maintained web applications.</li>';
    }
}

function addEducation() {
    eduCount++;
    const id = eduCount;
    const formHtml = `
        <div id="edu-form-${id}" class="border p-4 rounded-lg space-y-2 relative">
            <button onclick="removeElement('edu-form-${id}', 'edu-preview-${id}')" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">&times;</button>
            <input type="text" placeholder="e.g., B.S. in Computer Science" class="p-2 border rounded-lg w-full" oninput="updateEducation(${id})">
            <input type="text" placeholder="e.g., University of California" class="p-2 border rounded-lg w-full" oninput="updateEducation(${id})">
            <input type="text" placeholder="e.g., Sep 2016 - May 2020" class="p-2 border rounded-lg w-full" oninput="updateEducation(${id})">
        </div>
    `;
    document.getElementById('education-forms').insertAdjacentHTML('beforeend', formHtml);
    
    const previewHtml = `
        <div id="edu-preview-${id}" class="text-sm">
            <h4 class="font-semibold text-gray-800">B.S. in Computer Science</h4>
            <div class="flex justify-between text-gray-600 text-xs italic">
                <span>State University</span>
                <span>Aug 2017 - May 2021</span>
            </div>
        </div>
    `;
    document.getElementById('preview-education').insertAdjacentHTML('beforeend', previewHtml);
    updateEducation(id);
}

function updateEducation(id) {
    const form = document.getElementById(`edu-form-${id}`);
    const preview = document.getElementById(`edu-preview-${id}`);
    if (!form || !preview) return;

    const [degree, institution, dates] = form.querySelectorAll('input');

    preview.querySelector('h4').innerText = degree.value || 'B.S. in Computer Science';
    preview.querySelector('span:first-child').innerText = institution.value || 'State University';
    preview.querySelector('span:last-child').innerText = dates.value || 'Aug 2017 - May 2021';
}

function addSkill() {
    globalSkillCount++;
    const id = globalSkillCount;
    const formHtml = `
        <div id="skill-form-${id}" class="flex gap-2 items-center relative">
            <input type="text" placeholder="Skill (e.g., Python)" class="p-2 border rounded-lg w-1/2 text-sm" oninput="updateSkill(${id})">
            <input type="number" min="0" max="100" placeholder="%" class="p-2 border rounded-lg w-1/4 text-sm" oninput="updateSkill(${id})">
            <button onclick="removeElement('skill-form-${id}', 'skill-preview-${id}')" class="text-red-500 hover:text-red-700 font-bold text-lg">&times;</button>
        </div>
    `;
    document.getElementById('skill-forms').insertAdjacentHTML('beforeend', formHtml);
    
    const previewHtml = `
        <div id="skill-preview-${id}" class="text-xs">
            <span class="text-white font-medium">Skill</span>
            <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                <div class="bg-gray-700 h-1.5 rounded-full" style="width: 80%"></div>
            </div>
        </div>
    `;
    document.getElementById('preview-skills').insertAdjacentHTML('beforeend', previewHtml);
    updateSkill(id);
}

function updateSkill(id) {
    const form = document.getElementById(`skill-form-${id}`);
    const preview = document.getElementById(`skill-preview-${id}`);
    if (!form || !preview) return;

    const [nameInput, percentInput] = form.querySelectorAll('input');
    const name = nameInput.value || 'Skill';
    let percentage = parseInt(percentInput.value) || 0;
    percentage = Math.max(0, Math.min(100, percentage));

    preview.querySelector('span').innerText = name;
    preview.querySelector('.bg-gray-700').style.width = percentage + '%';
}


function addExpertise() {
    expertiseCount++;
    const id = expertiseCount;
    const formHtml = `
        <div id="expertise-form-${id}" class="relative">
            <input type="text" placeholder="e.g., Data Entry" class="p-2 border rounded-lg w-full pr-10" oninput="updateExpertise(${id})">
            <button onclick="removeElement('expertise-form-${id}', 'expertise-preview-${id}')" class="absolute top-1/2 right-2 -translate-y-1/2 text-red-500 hover:text-red-700 font-bold">&times;</button>
        </div>
    `;
    document.getElementById('expertise-forms').insertAdjacentHTML('beforeend', formHtml);
    
    const previewHtml = `<li id="expertise-preview-${id}">Data Entry</li>`;
    document.getElementById('preview-expertise').insertAdjacentHTML('beforeend', previewHtml);
    updateExpertise(id);
}

function updateExpertise(id) {
    const form = document.getElementById(`expertise-form-${id}`);
    const preview = document.getElementById(`expertise-preview-${id}`);
    if (!form || !preview) return;

    const input = form.querySelector('input');
    preview.innerText = input.value || 'Expertise Item';
}

function addLanguage() {
    langCount++;
    const id = langCount;
    const formHtml = `
        <div id="language-form-${id}" class="relative">
            <input type="text" placeholder="e.g., English (Native)" class="p-2 border rounded-lg w-full pr-10" oninput="updateLanguage(${id})">
            <button onclick="removeElement('language-form-${id}', 'language-preview-${id}')" class="absolute top-1/2 right-2 -translate-y-1/2 text-red-500 hover:text-red-700 font-bold">&times;</button>
        </div>
    `;
    document.getElementById('language-forms').insertAdjacentHTML('beforeend', formHtml);
    
    const previewHtml = `<li id="language-preview-${id}">English (Native)</li>`;
    document.getElementById('preview-language').insertAdjacentHTML('beforeend', previewHtml);
    updateLanguage(id);
}

function updateLanguage(id) {
    const form = document.getElementById(`language-form-${id}`);
    const preview = document.getElementById(`language-preview-${id}`);
    if (!form || !preview) return;

    const input = form.querySelector('input');
    preview.innerText = input.value || 'English (Native)';
}

function removeElement(formId, previewId) {
    document.getElementById(formId)?.remove();
    document.getElementById(previewId)?.remove();
}

function handlePrint() {
    window.print();
}