const express=require ('express');
const app=express();
const cors=require('cors');
const categories = ['All', 'Technology', 'Programming', 'Lifestyle', 'Fitness', 'Education'];
const stories= [
    { id: 1, title: 'React Basics', content: 'This is a story about React Basics.' },
    { id: 2, title: 'Advanced Programming', content: 'This story covers advanced programming topics.' },
    { id: 3, title: 'Healthy Living', content: 'Tips for healthy living and well-being.' },
    { id: 4, title: 'Workout Tips', content: 'Workout tips for a better physique.' },
    { id: 5, title: 'Online Learning', content: 'How to make the most of online learning.' },
  ];
  app.use(express.json());

  app.use(cors());
// admin Routes
app.get('/admins',(req,res)=>{
    res.status(200).json({stories});
})
app.get('/admins/categories',(req,res)=>{
    res.status(200).json({categories});
})



//stories routes
app.get('/admins/stories',(req,res)=>{
    res.status(200).json({stories});
})
app.get('/admins/story/:id',(req,res)=>{
    const id=Number(req.params.id);
    console.log(id);
    
    const story=stories.find(item=>item.id===id);
    res.status(200).json({story});
});
app.post('/admins/story/create', async (req, res) => {
    try {
        const { title, parentCategory, content } = req.body;
        console.log( req.body);
        console.log(title);

      if (!title || !parentCategory || !content) {

        return res.status(400).json({ message: 'All fields are required' });
      }
    //   { title, parentCategory, content }
    //   const newStory = new Story({
    //     title,
    //     parentCategory,
    //     content,
    //   });
    //   await newStory.save();
  
      res.status(201).json({ message: 'Story created successfully', story: newStory });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });



app.listen(3000,()=>{
    console.log('server is running on port 3000');
})