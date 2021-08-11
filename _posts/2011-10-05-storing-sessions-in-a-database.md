---
title: "Storing Sessions in a database"
date: "2011-10-05"
categories: 
  - "posts-from-old-site"
  - "security"
  - "tutorials"
tags: 
  - "database"
  - "php"
  - "tutorial"
---

Most common applications and “home-brew” sites use sessions for storing temporary data as well as authentication. However, sometimes a developer may want the session to span over multiple domains and or servers, and some may just be very security conscience. It is common knowledge that session data is stored in a text file on the webserver, however if you are using a shared server (as most cannot afford dedicated hosting or VPS) then any user on that server may see your session files. To prevent this, and allow your user's sessions to span over multiple domains the answer is easy: store the session data in a MySQL database! Most of you may not be sure how to do this, or may have even been unaway that this is possible, however it is very easy. When storing sessions in a database PHP makes the work easy for us with the use of a function called session\_set\_save\_handler(), this function can control the way that sessions are stored, retrieved, destroyed, etc.

But before we get into that, we need to set up the database. Use the SQL statement below to create a database table to store the session information in.

\[cc lang="sql"\]CREATE TABLE \`sessions\` ( \`id\` varchar(40) NOT NULL, \`access\` int(10) NOT NULL, \`data\` text NOT NULL, PRIMARY KEY (\`id\`) ) \[/cc\]

Now that we have our database set up we can begin working on the PHP code. The session\_set\_save\_handler function accepts a total of six (6) parameters. These are as follows:

1\. open 2. close 3. read 4. write 5. destroy 6. gc

All of these parameters reference callback functions that you must define yourself, but don't worry, I'll walk you through the process.

First we'll start with “open”. This function controls how PHP opens a session file. In this tutorial the “open” function will simply open a connection to our MySQL server and select our database.

\[cc lang="php"\]function open\_session(){ global $session\_db; $session\_db=mysql\_connect('localhost','user','pass'); mysql\_select\_db('mydatabase',$session\_db); } \[/cc\]

As you may have noticed, I defined a global ($session\_db) at the beginning of the function and assigned it as the database resource, this is because when using functions like mysql\_query() if we don't specify a database handle it will use the most recently opened connection, which may cause problems if you are using multiple databases in your application. An example would be if you were making your sessions span multiple websites, all of which use a different database to store information.

The next callback function is the “close” parameter, this tells PHP how to close the session files. In this tutorial it will simply close the database connection.

\[cc lang="php"\]function close\_session(){ global $session\_db; mysql\_close($session\_db); } \[/cc\] This actually seems pretty easy right? That's because it is! Now on to the others. Next is the “read” callback, this is how PHP, you guessed it, reads the session data.

\[cc lang="php"\]function read\_session($id){ global $session\_db;

$id=mysql\_real\_escape\_string($id);  //never trust input!

//Query to select the session data from the database $query=”SELECT \`data\` FROM \`sessions\` WHERE \`id\`='$id'”;

if($result=mysql\_query($query, $session\_db)){ $session=mysql\_fetch\_assoc($result); return $session\['data'\];    //If the session was in the database, return the data }else{ return FALSE;        //If the session was not in the database, return FALSE } } \[/cc\] Now on to “write”... \[cc lang="php"\] function write\_session($id,$data){ global $session\_db;

$time=time(); $id=mysql\_real\_escape\_string($id); $data=mysql\_real\_escape\_string($data)

$query=”REPLACE INTO \`sessions\` VALUES ('$id','$time','$data')”; mysql\_query($query,$session\_db);

}\[/cc\] Next is the “destroy” callback, this is what is called when we want a session to be destroyed, for example when you call the function session\_destroy(). Basically this will just delete the session from our database and never look back. \[cc lang="php"\]function destroy\_session($id){ global $session\_db;

$id=mysql\_real\_escape\_string($id);

$query=”DELETE FROM \`sessions\` WHERE \`id\`='$id'”; mysql\_query($query); } \[/cc\] The very last one is “gc” which stands for “Garbage Collector” this function is basically just run randomly (as chosen by PHP) to clean out all of the old sessions (aka garbage). This will help keep the database from overflowing with dead or old sessions. \[cc lang="php"\]function clean\_session($life){ global $session\_db;

$expire=time()-$life;

$query=”DELETE FROM \`sessions\` WHERE \`access\`<'$expire'”; mysql\_query($query); }\[/cc\]

The variable that PHP passes to this function is the max life time of a session and is configured in the PHP config file.

Now that we have all of our functions set, let's see what it look like all together shall we? \[cc lang="php"\]\[/cc\] Now you know how to store sessions in a MySQL database! If you have any questions or problems feel free to contact me and I'll do my best to help you out.

Also please keep in mind, that although this will grant you a form of protection on shared hosting servers, this does NOT offer protection from Session Fixation or Session Hijacking attempts. For more information on these look for them in my upcoming paper on Web Application Security!
