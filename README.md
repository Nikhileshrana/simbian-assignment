# Simbian Security Operations Comparison Section Assignment

Developed a modern and interactive section for Simbian Security, allowing users to clearly see the difference between using Simbian Security and not using it. In this section users can compare the difference between using Simbian Security and not using it. The section is built using Next.js, Tailwind CSS, and Framer Motion. The section is fully responsive and can be used on mobile, tablet, and desktop. The section is also animated and smooth. The section is also dynamic and can be used to compare different scenarios.

My approach was simple. I first created the ui thinking of them as raw structures as div then placing them accordingly. After that, i tested them by adding tailwind property border-2 border-red-700 just incase. :) . Then I started adding the data and logic. for that i first created an array with 2 objects inside which we have arrays of data . for with simbian and without simbian -> then i mapped them and returned them. therefore showcasing the data.

For the Animation library i used framer motion now "motion". i read the documentation and side by side i applied the changes. like initial , transition, whileHover, whileTap, whileFocus.etc

after that i added the logic for the buttons and the data. for that i used useState and useEffect hooks. Took help from gen ai to build the code bnased on my logic as it was costing me a lot of time and as a developer 

I think if we know the logic and the basics we can build the code faster and easier makuing correct use of AI. 
- Sir Thibault. (First Chief AI Product Officer at Ignite Tech).

### Areas of Improvement
- Dynamic data fetching
- Adding Graphs and charts for more insights
- Using of ShadCN ui components for faster and smoother development process

![Dashboard Preview](public/Home.png)

The project is built with the Next.js App Router, using TypeScript and Tailwind CSS for styling, as per the requirements. It has been deployed on Vercel.

I added multiple components with motion-based animations while maintaining a consistent directory structure and naming convention. I used useState and useEffect hooks for state management and side effects, setting up the project in a way that's scalable and easy to maintain.


## ✨ Features

- **Next.js Framework**: Next.js Framework used with App Router
- **Tailwind CSS**: Styling done with Tailwind CSS
- **Motion**: Animations done with Framer Motion
- **Lucide React**: Icons provided by Lucide React
- **Next-themes**: Dark/Light mode support with Next-themes
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop
- **Smooth Animations**: Engaging motion effects using Framer Motion
- **Modern UI Components**: Built with Tailwind CSS
- **Comments Included**

### Dynamic Comparison View
- Animated transitions between states
- Responsive layout adaptation
- Status indicators
- Status updates

### Alert Management
- Real-time alert notifications
- Counter animations
- Status indicators

## 🏃‍♂️ Getting Started

1. Clone the repository:
```bash
git clone <https://github.com/Nikhileshrana/simbian-assignment.git>
```

## Images

### Without Simbian Security
![Dashboard Preview](public/Without_Simbian.png)
### With Simbian Security
![Dashboard Preview](public/With_Simbian.png)
### Tablet View
![Dashboard Preview](public/Tablet_Responsiveness.png)
### Mobile View
![Dashboard Preview](public/Mobile_Responsiveness.png)
### Light House Scores
![Dashboard Preview](public/Performance.png)

