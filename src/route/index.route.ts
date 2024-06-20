import userRoute from "./user.route";

function apiroute(app: any) {
    app.use('/api', userRoute);
}
export default apiroute;