interface User {
    id: number;
    name: string;
    email: string;
}
interface Post {
    id: number;
    title: string;
    body: string;
}
async function fetchUsers(){
    const response = await fetch (
        'https://dummyjson.com/users'
    );

    if(!response.ok){
        throw new Error(`Failed to fetch users: ${response.status}`)
    }

    const data:unknown = await response.json();
    if (typeof data !== 'object' || data === null) {
    throw new Error('Invalid API response');
    }

const responseData = data as Record<string, unknown>;
    if (!Array.isArray(responseData.users)) {
     throw new Error('Invalid users data');
    }
    const users: User[]=[];
    for (const item of responseData.users) {
        if (typeof item !== 'object' || item === null) {
        throw new Error('Invalid user');
       
    }
    const user = item as Record<string, unknown>;
    

if (
  typeof user.id !== 'number' ||
  typeof user.firstName !== 'string' ||
  typeof user.lastName !== 'string' ||
  typeof user.email !== 'string'
) {
  throw new Error('Invalid user');
    }
    users.push({
        id: user.id,
        name:`${user.firstName} ${user.lastName}`,
        email:user.email
    });
  }
    return users;
}
async function fetchPosts() {
    const response = await fetch(
        'https://dummyjson.com/posts'
    );
    if (!response.ok){
        throw new   Error(`failed to fetch posts: ${response.status}`);
        
    }
    const data: unknown = await response.json();
    if(typeof data !=='object'|| data=== null){
        throw new Error('Invalid API response')
    }
    const responseData = data as Record<string, unknown>;
    if (!Array.isArray(responseData.posts)) {
        throw new Error('Invalid posts data');
}
const posts: Post[] = [];

for (const item of responseData.posts) {
if (typeof item !== 'object' || item === null) {
  throw new Error('Invalid post');

}
  const post = item as Record<string, unknown>;
if (
    typeof post.id !== 'number' ||
    typeof post.title !== 'string' ||
    typeof post.body !== 'string'
  ) {
    throw new Error('Invalid post');
  }

  posts.push({
    id: post.id,
    title: post.title,
    body: post.body
  });
}
return posts;
}

async function main(){
    const results = await Promise.allSettled([
    fetchUsers(),
    fetchPosts()
    ]);
    const usersResult = results[0];
    const postsResult = results[1];
    const users: User[] = [];
    const posts: Post[] = [];
    if (usersResult.status === 'fulfilled') {
  users.push(...usersResult.value);
} else {
  console.error('Users failed:', usersResult.reason);
}
if (postsResult.status === 'fulfilled') {
  posts.push(...postsResult.value);
} else {
  console.error('Posts failed:', postsResult.reason);
}
return {
  users,
  posts
};
}
main().then(result => {
  console.log('Final result:', result);
});