---
title: "Secure Hashing"
date: "2011-10-05"
categories: 
  - "posts-from-old-site"
  - "security"
tags: 
  - "hashing"
  - "passwords"
  - "php"
---

Many developers believe in the practice of securing passwords and other financial data using a hash function (a function of turning some kind of data into a small number that may serve as a digital "fingerprint"). However just hashing a password isn’t enough it may still be bruteforced and as usernames and passwords are determined by the users not all will meet minimum secure levels so it is up to the developer to pick up where they leave off.

 

_Note: Examples used in this article are in PHP_

Many developers believe in the practice of securing passwords and other financial data using a hash function (a function of turning some kind of data into a small number that may serve as a digital "fingerprint"). However just hashing a password isn’t enough it may still be bruteforced and as usernames and passwords are determined by the users not all will meet minimum secure levels so it is up to the developer to pick up where they leave off.

Many developers use hashes such as MD5 however very good this also has it’s flaws as it is only a 128-bit digest (encryption) it is far less secure then say the SHA1 hash which is a 160-bit digest. To cover for this many use something called “salts” which are random characters appended to the data before it is encrypted which would make it harder to brute-force. Even though salting the data is a great method of protection there is still more we can do.

Combining different message digests, such as SHA1 and MD5, we may make an even more secured encryption for example:

\[cci lang="php"\] $hash=md5( sha1("Password" . "salt") ) ); \[/cci\]

Now as one may be able to tell this can and will create a fairly nice MD5 hash, but can you see a problem? As stated in a previous paragraph the 128-bit MD5 algorithm is less secure than the 160-bit SHA1 So let’s switch the two around, and add a few more salts ![](images/15.gif)

\[cci lang="php"\] $hash= sha1( "a9b" . md5("Password" . "salt"), "aa9a" . "salt" ) ; \[/cci\]

Remember this will execute the inner brackets first so the first executed, which is md5("Password" . "salt") and returns 32 bytes (128 bits) of the password and the salt. Now we are going to convert these 32 bytes into 40 bytes, since going from a strong (40 byte) hash to a weaker (32 byte) hash just doesn't sound nice. In the process of all of this we have added two more special salts and a random salt. Say for example you have got the final 40 byte hash and it has been cracked. Suppose you made the hash using:

\[cci lang="php"\] $hash=sha1("a9b" . md5("Password" . "salt"), "aa9a"); \[/cci\]

You would then get something like this:

a9ba5a67a5a454a7a6a4a3a5a778aa8a1a34aa9a

Now it is 39 bytes instead of 32, now you have a problem. Before you can attempt to crack the next level you need to figure out (if you can't see the algorithm or how it was hashed) where you extract the next MD5 hash, so it could be anyone of these:

a9ba5a67a5a454a7a6a4a3a5a778aa8a1 9ba5a67a5a454a7a6a4a3a5a778aa8a1a ba5a67a5a454a7a6a4a3a5a778aa8a1a3 a5a67a5a454a7a6a4a3a5a778aa8a1a34 5a67a5a454a7a6a4a3a5a778aa8a1a34a a67a5a454a7a6a4a3a5a778aa8a1a34aa 67a5a454a7a6a4a3a5a778aa8a1a34aa9 7a5a454a7a6a4a3a5a778aa8a1a34aa9a

Now if you add more they will then have an even harder job of finding out if it's an MD5 or SHA1 hash in which they are trying to find! Take note however that this MUST be a MD5 hash because there are 39 bytes, not more then 40 bytes for it to be a SHA1 hash.

With all of this they would have to bruteforce each and every one of those until they get the correct one, and even then they have to crack that one (talk about a headache)! So all in all... it is much safer... and a very very safe hash would be something like this:

\[cci lang="php"\] $hash=sha1( "a9bfa812a" . md5("9a72cd" . md5("Password" . "salt"), "b1afb43") . "a982efa1" . md5("salt") ); \[/cci\]

If you work that back like i did above... you will find a hell of a lot of combinations and in the end you will not even no if you are cracking the correct sha or md5 hash! Results... billions of years to crack!

Just cracking the SHA1 hash will result in a string being 81 characters long (all valid hex characters) results being 50 possible md5 hashes, and 40 possible sha1 hashes... now try and find the correct hash from a total of 90 hashes! After that is cracked you still won't know if it's the correct one since it will return yet another hash!

So in conclusion when writing your encryption algorithm be absolutly sure to add multiple layers of encryption and use many different salts (may be a good idea for them to be hex characters) as well. This will give the cracker a much harder time gaining user passwords if s/he ever manages to get ahold of your database.

Until next time, Peace out!

_Credits:_

Thanks to VBAssassin for all of the usefull info, most of which is presented here in this article. The true credit goes to him. VBAssassins Profile: [http://www.coderprofile.com/coder/VBAssassin](https://web.archive.org/web/20111008010244/http://www.coderprofile.com/coder/VBAssassin "http://www.coderprofile.com/coder/VBAssassin") Based on: [http://www.coderprofile.com/coding-article/2/about-hashes](https://web.archive.org/web/20111008010244/http://www.coderprofile.com/javascript/components/fckeditor/editor/[url]http://www.coderprofile.com/coding-article/2/about-hashes)
