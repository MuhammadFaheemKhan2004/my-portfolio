import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: 'https://via.placeholder.com/400x300',
        },
        technologies: [
            {
                type: String,
            },
        ],
        github: {
            type: String,
            default: '',
        },
        demo: {
            type: String,
            default: '',
        },
        featured: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Project', ProjectSchema);
