import { motion } from "framer-motion";

const reviews = [
  {
    id: 1,
    name: "Rahul Mehta",
    date: "12 Jan 2025",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    review:
      "The quality of the sofa exceeded my expectations. Solid build, premium fabric, and very comfortable for daily use."
  },
  {
    id: 2,
    name: "Neha Sharma",
    date: "28 Jan 2025",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    review:
      "Loved the dining table design. It looks elegant and perfectly fits our space. Delivery was smooth and on time."
  },
  {
    id: 3,
    name: "Amit Verma",
    date: "05 Feb 2025",
    avatar: "https://randomuser.me/api/portraits/men/68.jpg",
    review:
      "Bought a bed with storage and it’s extremely sturdy. The finishing and detailing are top-notch."
  },
  {
    id: 4,
    name: "Pooja Nair",
    date: "14 Feb 2025",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    review:
      "The wardrobe quality is excellent and the installation team was professional. Highly satisfied with the purchase."
  },
  {
    id: 5,
    name: "Kunal Singh",
    date: "22 Feb 2025",
    avatar: "https://randomuser.me/api/portraits/men/51.jpg",
    review:
      "Great value for money. The coffee table looks minimal yet premium. Would definitely recommend."
  },
  {
    id: 6,
    name: "Anjali Kapoor",
    date: "02 Mar 2025",
    avatar: "https://randomuser.me/api/portraits/women/64.jpg",
    review:
      "Customer support was responsive and helpful. The furniture arrived well-packed with no damage."
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.35 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const Reviews = () => {
  return (
    <section className="p-8 ">
      <h2 className="text-4xl font-bold text-white mb-8">What people say</h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{once:true, amount: 0.35 }}
        className="grid gap-6 md:grid-cols-3"
      >
        {reviews.map((item) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            className="relative bg-gray-100 rounded-3xl p-8 shadow-lg flex flex-col justify-between"
          >
            {/* Quote icon */}
            <span className="absolute top-6 left-6 text-6xl text-gray-400 leading-none">“</span>

            <p className="text-gray-900 text-lg leading-relaxed mt-8 mb-8">
              {item.review}
            </p>

            <div className="flex items-center gap-4">
              <motion.img
                src={item.avatar}
                alt={item.name}
                className="h-12 w-12 rounded-full object-cover"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              />
              <div>
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.date}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Reviews;
