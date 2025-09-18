export const getCurrentUser = () => async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
    }
    catch (error) {