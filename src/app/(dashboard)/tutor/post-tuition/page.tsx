import PostTuitionManager from '@/components/dashboard/PostTuitionManager';

const PostTuition = () => {
    const URL: string | undefined = process.env.BACKEND_BASE_URL;
    console.log(URL);
    return <PostTuitionManager url={URL} />;
};

export default PostTuition;
