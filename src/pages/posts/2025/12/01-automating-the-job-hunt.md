---
share: true
title: "Automating the Job Hunt: If you can't beat 'em, join 'em"
description: "The job market is broken, so I decided to bring in some heavy artillery. Here is how I used N8N, Google Gemini, and a little bit of scraping to automate the tedious part of finding a new role."
date: "2025-12-01"
categories:
  - "ai"
  - "personal"
tags:
  - "n8n"
  - "ai"
  - "job-search"
headerimage: "job-hunt-automation.jpg" 
---

So, let's be real for a second. The job market right now? It's broken. It feels like shouting into a void, countless applications, emails, and LinkedIn messages going unanswered.  That doesn't even begin to account for recruiters simply vanishing after a message or a phone call.

I have maintained for a long time that I would not use AI to purely automate my career, but ultimately it seems I'm in a "if you can't beat them, join them" situation. Recruiters are using AI to filter us out, so why shouldn't we use AI to filter them in?

Before some of you recruiters start: While you may not be using, it doesn't mean that they are not being used at all.  For example, [ADP](https://www.adp.com/-/media/adp/no-cache/candidate-relevancy/candidate-relevancy-faq.pdf), [HireVue](https://www.hirevue.com/wp-content/uploads/2022/04/HV_AI_Short-Form_Explainability_1pager.pdf), [Workday](https://www.workday.com/en-us/legal/responsible-ai-and-bias-mitigation.html), 

And there are [many others out there](https://www.secondtalent.com/resources/top-ai-tools-for-candidate-screening/), in fact, here's another image many job seekers are finding these days:

![AI screening](1706131196486-4021771617.png)
Unfortunately I've actually seen some that state opting out immediately disqualifies you from candidacy.

So can we please stop with the narrative that AI isn't screening out candidates? It’s completely out of touch with reality. At best, it’s naive optimism. At worst? It’s a flat-out lie that destroys credibility.

Instead of using those shady "AI auto-apply" services that spam every inbox on the planet, I figured I'd take a more surgical approach. I wanted something to strictly help me identify jobs that meet my specific criteria and save me from hours of doom-scrolling and reading generic descriptions. Plus, this way I can automate the boring stuff and continue to iterate on it as needed.

Since I already have [N8N](https://n8n.io) running on my [Unraid](https://unraid.net) server at home for playing around with [home automation](/posts/2025/10/26-ai-in-home-network/), I figured I'd go ahead and pull it in to help with my job search.

## How it works

The logic here is actually pretty straightforward. It’s an N8N workflow that scrapes jobs from LinkedIn and compares them against my actual resume to generate a "fit score."

Here is the high-level breakdown:

1.  **Initialization:** It connects to Google Drive and downloads my current Resume (PDF).
2.  **Search:** It generates a search URL based on parameters I set (Remote, Salary, Keywords) and extracts the job links from the results.
3.  **The Loop:** It loops over every link and fetches the full HTML of the job listing.
4.  **The Brain:** It sends the job description and my resume text to **Google Gemini**. (In this version I am using Gemini 2.5 Pro, but honestly, you could configure this to use a Flash model to save some tokens and time).
5.  **The Verdict:** Gemini compares the two and generates a JSON score. If that score meets or exceeds my specified threshold (usually 75/100), N8N connects to Google Sheets and appends a row with the job details, the score, and a one-sentence summary of *why* it's a match.

This automation **does not apply for me**. It simply exists to curate a list of "High Probability" targets so I can spend my energy writing actual, human cover letters for the jobs that matter.

## The "Senior Recruiter" Persona

The secret here isn't the scraping; it's the prompt. I didn't want the AI to just say "Yes, this matches." I wanted it to act like a grumpy, seasoned recruiter.

I set up a "Knockout Phase" to immediately discard roles that are on-site (I'm looking for remote) or require tech stacks I have no interest in (looking at you, Fortran).

Here is the actual prompt I'm feeding Gemini:

```text
### ROLE
You are a Senior Technical Recruiter with 20+ years of experience. You are pragmatically analyzing resumes against job descriptions to determine fit.

### INPUT DATA
**Banned Keywords:** {{ $('Set Variables').first().json.ignore_keywords }}
**Candidate Resume:** {{ $('Extract from File').last().json.text }}
**Job Description:** {{ $json.description }}

### MATCHING LOGIC
Follow these steps strictly to determine the "score".

1. **Knockout Phase (Immediate Disqualification - Score 0):**
   - **Keywords:** Scan the Job Title and Duties for any of the "Banned Keywords". If present, Score = 0.
   - **Location:** If the role is explicitly "On-site" (requires 100% office presence), Score = 0. (Remote and Hybrid are acceptable).
   - **Status:** If the text indicates the role is "Closed" or "No longer accepting applications", Score = 0.

2. **Education Handling:**
   - If a degree is listed as required but the listing adds "or equivalent experience," ignore the degree requirement. Focus purely on the candidate's professional experience.

3. **Scoring Phase (0-100):**
   - **Tech Stack (40 pts):** Does the candidate know the core languages/tools?
   - **Experience Level (30 pts):** Is the candidate Senior/Staff/Principal if required? (Do not penalize if over-qualified, only if under-qualified).
   - **Domain/Industry (20 pts):** Previous experience in the specific industry.
   - **Salary (10 pts):** If salary is listed, does it align with a senior level? (If not listed, award full points to avoid false negatives).

### OUTPUT FORMAT
- Return ONLY valid JSON.
- Do not include preamble or explanation text.

Required JSON Structure:
{
  "score": NUMBER,
  "salaryRange": "STRING (Extracted value or 'Not Mentioned')",
  "industry": "STRING (Inferred from company description, e.g., Fintech, SaaS, Healthcare)",
  "reasoning": "STRING (Brief 1-sentence explanation of the score)"
}
````

## Configuration

I built the workflow with a set of variables at the start so I don't have to dig into the code every time I want to tweak the search.

  * **`desired_score`**: The minimum relevance score a job posting must meet to be saved.
  * **`wait_time`**: The delay (in seconds) between scrape requests. **Important:** Don't be a jerk. Rate limiting exists for a reason.
  * **`search_keywords`**: A JSON array of job titles (e.g., `["Principal Engineer", "Staff Engineer"]`).
  * **`search_location`**: Usually just "USA".
  * **`search_remote`**: Filters for Remote/Hybrid.
  * **`ignore_keywords`**: This is crucial. I have a list of words here that immediately kill the vibe (e.g., "Manager" - I want to remain on the IC track rather than go management at this point).

## The Workflow

If you want to spin this up yourself, you'll need a few things:

1.  An **N8N instance**.
2.  A **Google Gemini API key** (which you can grab from [Google AI Studio](https://aistudio.google.com/app/api-keys)).
3.  **Google Cloud OAuth Credentials**: This is the tricky part. To let N8N talk to your Google Drive and Sheets, you will need to create a project in the [Google Cloud Console](https://console.cloud.google.com/), enable the Drive and Sheets APIs, and generate an OAuth Client ID and Secret.

To top it off, I also added a [PushOver](https://pushover.net) node at the end. It sends a push notification to my phone every time the automation completes so I can immediately check out the results.

![](n8n-jobsearch-screenshot.png)

Here is the full JSON for the workflow. You should be able to just import this, swap in your credentials, and hit run.

````json
{
  "name": "Linkedin Job Search",
  "nodes": [
    {
      "parameters": {
        "fieldToSplitOut": "links",
        "options": {}
      },
      "id": "eecff8b5-a116-41b6-823b-68ae42bd3a9e",
      "name": "Split Out",
      "type": "n8n-nodes-base.splitOut",
      "position": [
        944,
        -16
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "options": {}
      },
      "id": "7871f1ba-1d58-4427-be50-c7ab63213509",
      "name": "Loop Over Items",
      "type": "n8n-nodes-base.splitInBatches",
      "position": [
        -1840,
        352
      ],
      "typeVersion": 3
    },
    {
      "parameters": {
        "amount": "={{ $('Set Variables').first().json.wait_time }}"
      },
      "id": "8bdcd411-66b3-4de8-b069-9e2635283c6e",
      "name": "Wait",
      "type": "n8n-nodes-base.wait",
      "position": [
        -1408,
        304
      ],
      "webhookId": "c9cb4878-ae4d-4b8e-bd37-5395011f7761",
      "typeVersion": 1.1
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "=### ROLE\nYou are a Senior Technical Recruiter with 20+ years of experience. You are pragmatically analyzing resumes against job descriptions to determine fit.\n\n### INPUT DATA\n**Banned Keywords:** {{ $('Set Variables').first().json.ignore_keywords }}\n**Candidate Resume:** {{ $('Extract from File').last().json.text }}\n**Job Description:** {{ $json.description }}\n\n### MATCHING LOGIC\nFollow these steps strictly to determine the \"score\".\n\n1. **Knockout Phase (Immediate Disqualification - Score 0):**\n    - **Keywords:** Scan the Job Title and Duties for any of the \"Banned Keywords\". If present, Score = 0.\n    - **Location:** If the role is explicitly \"On-site\" (requires 100% office presence), Score = 0. (Remote and Hybrid are acceptable).\n    - **Status:** If the text indicates the role is \"Closed\" or \"No longer accepting applications\", Score = 0.\n\n2. **Education Handling:**\n    - If a degree is listed as required but the listing adds \"or equivalent experience,\" ignore the degree requirement. Focus purely on the candidate's professional experience.\n\n3. **Scoring Phase (0-100):**\n    - **Tech Stack (40 pts):** Does the candidate know the core languages/tools?\n    - **Experience Level (30 pts):** Is the candidate Senior/Staff/Principal if required? (Do not penalize if over-qualified, only if under-qualified).\n    - **Domain/Industry (20 pts):** Previous experience in the specific industry.\n    - **Salary (10 pts):** If salary is listed, does it align with a senior level? (If not listed, award full points to avoid false negatives).\n\n### OUTPUT FORMAT\n- Return ONLY valid JSON.\n- Do not use Markdown code blocks (```json).\n- Escape all special characters (especially double quotes) within the values to prevent parsing errors.\n- Do not include preamble or explanation text.\n\nRequired JSON Structure:\n{\n  \"score\": NUMBER,\n  \"salaryRange\": \"STRING (Extracted value or 'Not Mentioned')\",\n  \"industry\": \"STRING (Inferred from company description, e.g., Fintech, SaaS, Healthcare)\",\n  \"reasoning\": \"STRING (Brief 1-sentence explanation of the score)\"\n}",
        "options": {}
      },
      "id": "77aad0db-0f22-4f3a-814f-1a7e33faa36c",
      "name": "AI Agent",
      "type": "@n8n/n8n-nodes-langchain.agent",
      "position": [
        -432,
        304
      ],
      "typeVersion": 2,
      "retryOnFail": true,
      "alwaysOutputData": false
    },
    {
      "parameters": {
        "operation": "pdf",
        "options": {}
      },
      "id": "78036c9d-d7b3-473a-979c-9c263df05ec5",
      "name": "Extract from File",
      "type": "n8n-nodes-base.extractFromFile",
      "position": [
        -496,
        -16
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "operation": "download",
        "fileId": {
          "__rl": true,
          "value": "1obtN3MOBY6URx83LOO90lEXJeGdA1DQh",
          "mode": "list",
          "cachedResultName": "Ernest_Mallett_-_Principal_Software_Engineer (2).pdf",
          "cachedResultUrl": "https://drive.google.com/file/d/1obtN3MOBY6URx83LOO90lEXJeGdA1DQh/view?usp=drivesdk"
        },
        "options": {}
      },
      "id": "e294046a-bfeb-449d-a3fa-267cf007a3c6",
      "name": "Download file",
      "type": "n8n-nodes-base.googleDrive",
      "position": [
        -720,
        -16
      ],
      "typeVersion": 3,
      "credentials": {
        "googleDriveOAuth2Api": {
          "id": "Q9nhUvI4334ZVgOD",
          "name": "Google Drive account"
        }
      }
    },
    {
      "parameters": {
        "operation": "appendOrUpdate",
        "documentId": {
          "__rl": true,
          "value": "1T0t6FhQ-_ebeheb7VQ5_DyIIDiB2ATnNtztUQ9drXB8",
          "mode": "list",
          "cachedResultName": "Job Search",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1T0t6FhQ-_ebeheb7VQ5_DyIIDiB2ATnNtztUQ9drXB8/edit?usp=drivesdk"
        },
        "sheetName": {
          "__rl": true,
          "value": 1280711445,
          "mode": "list",
          "cachedResultName": "AI Scraped Listing",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1T0t6FhQ-_ebeheb7VQ5_DyIIDiB2ATnNtztUQ9drXB8/edit#gid=1280711445"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "link": "={{ $('Modify Job Attributes').item.json.applyLink }}",
            "Title": "={{ $('Modify Job Attributes').item.json.title }}",
            "score": "={{ $json.score }}",
            "Company": "={{ $('Modify Job Attributes').item.json.company }}",
            "Location": "={{ $('Modify Job Attributes').item.json.location }}",
            "description": "={{ $('Modify Job Attributes').item.json.description }}",
            "Salary": "={{ $json.salaryRange }}",
            "Industry": "={{ $json.industry}}"
          },
          "matchingColumns": [
            "link"
          ],
          "schema": [
            {
              "id": "Title",
              "displayName": "Title",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Company",
              "displayName": "Company",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Location",
              "displayName": "Location",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "link",
              "displayName": "link",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "score",
              "displayName": "score",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Salary",
              "displayName": "Salary",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "Industry",
              "displayName": "Industry",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "description",
              "displayName": "description",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            }
          ],
          "attemptToConvertTypes": false,
          "convertFieldsToString": false
        },
        "options": {}
      },
      "id": "25f942fb-cf39-490d-ba14-07ac4f26ae6c",
      "name": "Append or update row in sheet",
      "type": "n8n-nodes-base.googleSheets",
      "position": [
        512,
        320
      ],
      "typeVersion": 4.6,
      "credentials": {
        "googleSheetsOAuth2Api": {
          "id": "jowxM4NkfwUcCvtg",
          "name": "Google Sheets account"
        }
      }
    },
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "hours",
              "hoursInterval": 8
            }
          ]
        }
      },
      "id": "52b39606-686c-4ec2-b09d-40f8be84479a",
      "name": "Schedule Trigger",
      "type": "n8n-nodes-base.scheduleTrigger",
      "position": [
        -1872,
        -16
      ],
      "notesInFlow": false,
      "typeVersion": 1.2
    },
    {
      "parameters": {
        "url": "={{ $json.url }}",
        "options": {}
      },
      "id": "b6456973-23b1-4e88-8d2e-63dc40cf6a20",
      "name": "Fetch Jobs from Linkedin",
      "type": "n8n-nodes-base.httpRequest",
      "position": [
        464,
        -16
      ],
      "typeVersion": 4.2
    },
    {
      "parameters": {
        "url": "={{ $json.links }}",
        "options": {}
      },
      "id": "2c44cba4-d9b8-4470-9394-87f6cc8ca487",
      "name": "Fetch Job Page",
      "type": "n8n-nodes-base.httpRequest",
      "position": [
        -1200,
        304
      ],
      "executeOnce": false,
      "retryOnFail": true,
      "typeVersion": 4.2,
      "waitBetweenTries": 5000,
      "onError": "continueRegularOutput"
    },
    {
      "parameters": {
        "mode": "raw",
        "jsonOutput": "={{ $json.output.replaceAll(/```(?:json)?/g, \"\") }}\n",
        "includeOtherFields": true,
        "options": {}
      },
      "id": "4dbe84fa-ee99-49ae-b6f9-1d5ca4317978",
      "name": "Parse AI Output",
      "type": "n8n-nodes-base.set",
      "position": [
        -96,
        304
      ],
      "typeVersion": 3.4
    },
    {
      "parameters": {
        "operation": "extractHtmlContent",
        "extractionValues": {
          "values": [
            {
              "key": "title",
              "cssSelector": "div h1"
            },
            {
              "key": "company",
              "cssSelector": "div span a"
            },
            {
              "key": "location",
              "cssSelector": "div span[class*='topcard__flavor topcard__flavor--bullet']"
            },
            {
              "key": "description",
              "cssSelector": "div.description__text.description__text--rich"
            },
            {
              "key": "jobid",
              "cssSelector": "a[data-item-type='semaphore']",
              "returnValue": "attribute",
              "attribute": "data-semaphore-content-urn"
            }
          ]
        },
        "options": {}
      },
      "id": "8f465f6e-e2f9-43a0-8e47-841098c6c091",
      "name": "Parse Job Attributes",
      "type": "n8n-nodes-base.html",
      "position": [
        -896,
        304
      ],
      "typeVersion": 1.2
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "784ead57-9d83-4e08-b83c-23fa165bf045",
              "name": "description",
              "type": "string",
              "value": "={{ $json.description.replaceAll(/\\s+/g, \" \") }}"
            },
            {
              "id": "fd3c9d2c-5ff9-46a7-b70a-f990fbc7da9d",
              "name": "jobid",
              "type": "string",
              "value": "={{ $json.jobid.split(\":\").last() }}"
            },
            {
              "id": "27a20cd2-ab0d-42b7-9cee-ea64e0e26ea3",
              "name": "applyLink",
              "type": "string",
              "value": "={{ \"[https://www.linkedin.com/jobs/view/](https://www.linkedin.com/jobs/view/)\"+ $json.jobid.split(\":\").last() }} "
            }
          ]
        },
        "includeOtherFields": true,
        "options": {}
      },
      "id": "88c56e51-364d-4f34-964d-5625231c4391",
      "name": "Modify Job Attributes",
      "type": "n8n-nodes-base.set",
      "position": [
        -656,
        304
      ],
      "typeVersion": 3.4
    },
    {
      "parameters": {
        "operation": "extractHtmlContent",
        "extractionValues": {
          "values": [
            {
              "key": "links",
              "cssSelector": "ul.jobs-search__results-list li div a[class*=\"base-card\"]",
              "returnValue": "attribute",
              "attribute": "href",
              "returnArray": true
            }
          ]
        },
        "options": {}
      },
      "id": "8d05b234-c990-471a-b270-0577b1af8d9d",
      "name": "Extract Job Links",
      "type": "n8n-nodes-base.html",
      "position": [
        688,
        -16
      ],
      "typeVersion": 1.2
    },
    {
      "parameters": {
        "modelName": "models/gemini-2.5-pro",
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
      "typeVersion": 1,
      "position": [
        -432,
        528
      ],
      "id": "961252bd-872d-4a1c-a09e-e73e7e2dc092",
      "name": "Google Gemini Chat Model",
      "credentials": {
        "googlePalmApi": {
          "id": "6Kzsar4xde5Si02l",
          "name": "Google Gemini(PaLM) Api account 2"
        }
      }
    },
    {
      "parameters": {
        "userKey": "ua6vi1xpe9q9asawdmfyxgzx9sk7xc",
        "message": "=Job List updated!  Click here to view!",
        "priority": 0,
        "additionalFields": {
          "url": "[https://docs.google.com/spreadsheets/d/1W4yJacWOiKMkDlpXKghINc4N9TA2a7SzPRUcyaTSrrw](https://docs.google.com/spreadsheets/d/1W4yJacWOiKMkDlpXKghINc4N9TA2a7SzPRUcyaTSrrw)"
        }
      },
      "type": "n8n-nodes-base.pushover",
      "typeVersion": 1,
      "position": [
        -1696,
        224
      ],
      "id": "8aee7ef8-f42f-4dc4-8c5c-c1459726ecbb",
      "name": "Push a message",
      "executeOnce": true,
      "credentials": {
        "pushoverApi": {
          "id": "zNuCTj8yjmmE6pDH",
          "name": "Pushover account"
        }
      }
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "0cd9e55e-34a7-4ccd-82cb-875d212b2e26",
              "leftValue": "={{ $json.score }}",
              "rightValue": "={{ $('Set Variables').first().json.desired_score }}",
              "operator": {
                "type": "number",
                "operation": "gt"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        112,
        304
      ],
      "id": "5f01b723-a9c5-45fe-93d0-c3fa7c8b9261",
      "name": "If"
    },
    {
      "parameters": {},
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [
        -1872,
        -176
      ],
      "id": "5bd4d20e-50bd-4b82-905b-03a8b5180f85",
      "name": "When clicking ‘Execute workflow’"
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "65f18096-afe5-4711-9bf7-208623274c00",
              "name": "desired_score",
              "value": 75,
              "type": "number"
            },
            {
              "id": "c268ddac-0b34-489f-b86e-bc8aa062662c",
              "name": "wait_time",
              "value": 5,
              "type": "number"
            },
            {
              "id": "8dc48ec1-b2f2-4e01-9a33-c854305dd5a2",
              "name": "=search_keywords",
              "value": "=[\"Principal Engineer\", \"Staff Engineer\"]",
              "type": "array"
            },
            {
              "id": "1b0a40d1-bb2e-45eb-a5a0-47c3f1f00b28",
              "name": "search_location",
              "value": "USA",
              "type": "string"
            },
            {
              "id": "936661f3-f547-4c2a-ae2f-7aa0b118fd02",
              "name": "search_remote",
              "value": "Remote",
              "type": "string"
            },
            {
              "id": "5903ef5d-9305-4842-a962-9170ae0dd81e",
              "name": "search_easyapply",
              "value": false,
              "type": "boolean"
            },
            {
              "id": "c00cd2d0-b37b-49f1-baf1-0a5ead6a8926",
              "name": "search_experiencelevel",
              "value": "Mid-Senior level",
              "type": "string"
            },
            {
              "id": "f7e8ffec-cb6a-48bc-b268-37d4f77f6d72",
              "name": "search_type",
              "value": "Full-time",
              "type": "string"
            },
            {
              "id": "9e9a6df1-6056-47cb-b1fa-aae0732aa7f4",
              "name": "ignore_keywords",
              "value": "[\"Manager\"]",
              "type": "array"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        -1024,
        -16
      ],
      "id": "855ce388-f739-4af9-b127-be53a4c8ed10",
      "name": "Set Variables"
    },
    {
      "parameters": {
        "jsCode": "let url = \"[https://www.linkedin.com/jobs/search/?f_TPR=r86400](https://www.linkedin.com/jobs/search/?f_TPR=r86400)\"\n\nconst keyword = $input.first().json.search_keywords\nconst location =  $('Set Variables').first().json.search_location\nconst experienceLevel = $('Set Variables').first().json.search_experiencelevel\nconst remote = $('Set Variables').first().json.search_remote\nconst jobType = $('Set Variables').first().json.search_type\nconst easyApply = $('Set Variables').first().json.search_easyapply\n\nif (keyword != \"\") {\n  url += `&keywords=${keyword}`;\n}\n\nif (location != \"\") {\n  url += `&location=${location}`;\n}\n\nif (experienceLevel !== \"\") {\n  // we have experienceLevel as a string with values like \"Internship, Entry level\"\n  // we  transform it to \"1,2,3\" where:\n  // Internship -> 1\n  // Entry level -> 2\n  // Associate -> 3\n  // Mid-Senior level -> 4\n  // Director -> 5\n  // Executive -> 6\n  const transformedExperiences = experienceLevel\n    .split(\",\")\n    .map((exp) => {\n      switch (exp.trim()) {\n        case \"Internship\":\n          return \"1\";\n        case \"Entry level\":\n          return \"2\";\n        case \"Associate\":\n          return \"3\";\n        case \"Mid-Senior level\":\n          return \"4\";\n        case \"Director\":\n          return \"5\";\n        case \"Executive\":\n          return \"6\";\n        default:\n          return \"\";\n      }\n    })\n    .filter(Boolean); // filter out any empty strings\n  url += `&f_E=${transformedExperiences.join(\",\")}`;\n}\n\nif (remote.length != 0) {\n  // we have remote as a string with values like \"Remote, Hybrid\"\n  // we transform it to \"2,3,1\" where:\n  // On-Site -> 1\n  // Remote -> 2\n  // Hybrid -> 3\n  const transformedRemote = remote\n    .split(\",\")\n    .map((e) => {\n      switch (e.trim()) {\n        case \"Remote\":\n          return \"2\";\n        case \"Hybrid\":\n          return \"3\";\n        case \"On-Site\":\n          return \"1\";\n        default:\n          return \"\";\n      }\n    })\n    .filter(Boolean); // filter out any empty strings\n  url += `&f_WT=${transformedRemote.join(\",\")}`;\n}\n\nif (jobType != \"\") {\n  // we have jobType as a string with values like \"Full-time, Part-time\"\n  // we transform it to \"F,P\" where:\n  // Full-time -> F\n  // Part-time -> P\n  // Contract -> C\n  // Temporary -> T\n  // Other -> O\n  // Internship -> I\n  const transformedJobType = jobType.split(\",\").map((type) => type.trim().charAt(0).toUpperCase());\n  url += `&f_JT=${transformedJobType.join(\",\")}`;\n}\n\nif (easyApply != false) {\n  url += \"&f_EA=true\";\n}\n\nreturn {url}"
      },
      "id": "7958375c-0c19-419b-ac6e-63ea2dd210bd",
      "name": "Create search URL",
      "type": "n8n-nodes-base.code",
      "position": [
        160,
        -16
      ],
      "typeVersion": 2
    },
    {
      "parameters": {
        "fieldToSplitOut": "search_keywords",
        "options": {}
      },
      "type": "n8n-nodes-base.splitOut",
      "typeVersion": 1,
      "position": [
        -64,
        -16
      ],
      "id": "c015fb5c-c3b9-4c74-bc23-84ceb4646934",
      "name": "Split Out1",
      "alwaysOutputData": true
    },
    {
      "parameters": {
        "jsCode": "// Get the variable from the start\nconst rawInput = $('Set Variables').first().json.search_keywords;\nlet cleanList;\n\n// Force check: Is it text? If so, parse it into a real list.\nif (typeof rawInput === 'string') {\n  cleanList = JSON.parse(rawInput);\n} else {\n  cleanList = rawInput;\n}\n\n// Output the clean list for the next node\nreturn [{\n  json: {\n    search_keywords: cleanList\n  }\n}];"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        -288,
        -16
      ],
      "id": "df73f906-cadc-4d44-943f-b144952b44ea",
      "name": "Restore Keywords"
    },
    {
      "parameters": {
        "content": "### Agent Configuration Variables\n\n* **`desired_score`**: The minimum relevance score a job posting must meet to be saved for review.\n* **`wait_time`**: The delay (in seconds) between scrape requests to prevent rate-limiting and ensure ethical scraping practices.\n* **`search_keywords`**: A JSON array of job titles or skill sets to query (e.g., `[\"Python Developer\", \"Data Scientist\"]`).\n* **`search_location`**: The geographic scope of the search (City, State, or Country).\n* **`search_remote`**: Boolean (`true`/`false`) flag to determine if remote-only positions should be included.\n* **`search_easyapply`**: Boolean (`true`/`false`) flag to filter for postings that support \"LinkedIn Easy Apply\".\n* **`search_experiencelevel`**: Filters results by seniority. Valid values: *Internship, Entry level, Associate, Mid-Senior level, Director, Executive*.\n* **`search_type`**: Filters results by employment contract. Valid values: *Full-time, Part-time, Contract, Temporary, Other, Internship*.\n* **`ignore_keywords`**: A list of specific words or phrases used to exclude unwanted job listings from the results.",
        "height": 448,
        "width": 608
      },
      "type": "n8n-nodes-base.stickyNote",
      "position": [
        -1408,
        -560
      ],
      "typeVersion": 1,
      "id": "4a65a2d8-4f42-4047-ae09-54bc2f38ef82",
      "name": "Sticky Note"
    }
  ],
  "pinData": {},
  "connections": {
    "Wait": {
      "main": [
        [
          {
            "node": "Fetch Job Page",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "AI Agent": {
      "main": [
        [
          {
            "node": "Parse AI Output",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Split Out": {
      "main": [
        [
          {
            "node": "Loop Over Items",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Download file": {
      "main": [
        [
          {
            "node": "Extract from File",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Fetch Job Page": {
      "main": [
        [
          {
            "node": "Parse Job Attributes",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Loop Over Items": {
      "main": [
        [
          {
            "node": "Push a message",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Wait",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Parse AI Output": {
      "main": [
        [
          {
            "node": "If",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Schedule Trigger": {
      "main": [
        [
          {
            "node": "Set Variables",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Extract Job Links": {
      "main": [
        [
          {
            "node": "Split Out",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Extract from File": {
      "main": [
        [
          {
            "node": "Restore Keywords",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Parse Job Attributes": {
      "main": [
        [
          {
            "node": "Modify Job Attributes",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Modify Job Attributes": {
      "main": [
        [
          {
            "node": "AI Agent",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Fetch Jobs from Linkedin": {
      "main": [
        [
          {
            "node": "Extract Job Links",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Append or update row in sheet": {
      "main": [
        [
          {
            "node": "Loop Over Items",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Google Gemini Chat Model": {
      "ai_languageModel": [
        [
          {
            "node": "AI Agent",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "If": {
      "main": [
        [
          {
            "node": "Append or update row in sheet",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Loop Over Items",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "When clicking ‘Execute workflow’": {
      "main": [
        [
          {
            "node": "Set Variables",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Set Variables": {
      "main": [
        [
          {
            "node": "Download file",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Create search URL": {
      "main": [
        [
          {
            "node": "Fetch Jobs from Linkedin",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Split Out1": {
      "main": [
        [
          {
            "node": "Create search URL",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Restore Keywords": {
      "main": [
        [
          {
            "node": "Split Out1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "53254952-2e2a-4b98-b89a-a3d4216558e4",
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "0d719de7344e92041f30a161d66004cfc528823d5373616af7be30fe3abbcc32"
  },
  "id": "5YtqVnXrCk6dw4tU",
  "tags": []
}
````

Happy hunting, and may the odds be ever in your favor\!