---
share: true
title: "Quick Update"
date: "2023-06-28"
categories:
  - "general"
tags: 
  - "personal"
  - "ai"
---

I just realized the other day that it's been a very long time since I've made any type of post on here.   I am still alive and still working in software, but a lot has happened.[Canada caught fire](https://www.cbsnews.com/news/map-canadian-wildfires-2023-where-are-the-fires-ontario-quebec/), there were riots, [insurrection trials](https://www.justice.gov/usao-dc/capitol-breach-cases), the [start of WWIII](https://en.wikipedia.org/wiki/Russian_invasion_of_Ukraine), and [much more](https://en.wikipedia.org/wiki/2022_in_the_United_States).

In the tech sector, however [ChatGPT](https://en.wikipedia.org/wiki/ChatGPT) is probably the biggest thing right now, and after using it to help me over the past few days on various projects I can definately see why.  When it first came out, I really just used it to answer simple questions, but this thing is extremely powerful.  I have been able to use it to greatly accelerate my productivity.  Granted it's not perfect and some stuff it spits out [can land you in hot water if you're not careful](https://www.reuters.com/legal/transactional/lawyer-used-chatgpt-cite-bogus-cases-what-are-ethics-2023-05-30/) but for developers that can understand what it's doing, its a great asset.

### Example

Just to show an example, on one of my side projects I'm heavily using [Twilio](https://www.twilio.com/en-us), and for this post I asked it to perform a quick task for me.  The prompt I gave it was:
> In c#, write a program that will buy a number through twilio and then listen for a SMS message, then delete the number

And here is the full code it spat out:

```csharp
using System;
using System.Linq;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

class Program
{
    static void Main()
    {
        const string accountSid = "YOUR_ACCOUNT_SID";
        const string authToken = "YOUR_AUTH_TOKEN";

        TwilioClient.Init(accountSid, authToken);

        var availableNumbers = AvailablePhoneNumberResource.Read("US", voiceEnabled: null, smsEnabled: true);

        if (availableNumbers != null && availableNumbers.Any())
        {
            var phoneNumber = availableNumbers.First().PhoneNumber;

            var incomingPhoneNumber = IncomingPhoneNumberResource.Create(
                phoneNumber: new PhoneNumber(phoneNumber),
                voiceUrl: new Uri("http://your-voice-url.com"), // Optional: Specify a voice URL if needed
                smsUrl: new Uri("http://your-sms-url.com") // Optional: Specify an SMS URL if needed
            );

            Console.WriteLine($"Phone number {incomingPhoneNumber.PhoneNumber} purchased successfully.");

            var incomingMessages = MessageResource.Read(
                from: new PhoneNumber("PHONE_NUMBER_TO_LISTEN"), // Replace with the phone number you want to listen to
                to: new PhoneNumber("YOUR_TWILIO_PHONE_NUMBER") // Replace with your Twilio phone number
            );

            foreach (var message in incomingMessages)
            {
                Console.WriteLine($"Received SMS: From: {message.From}, Body: {message.Body}");
            }

            IncomingPhoneNumberResource.Delete(pathSid: incomingPhoneNumber.Sid);

            Console.WriteLine("Phone number deleted successfully.");
        }
        else
        {
            Console.WriteLine("No available phone numbers found.");
        }
    }
}

```

Obviously judging by the above, this isn't exactly what I wanted and it wouldn't even work correctly "out of the box" but it gives a very good starting point.

Overall, there really isn't a point to this post other than to make one, since it's been almost 2 years since my last one.   But I will say, if you work in code and aren't using ChatGPT to help you yet...start.