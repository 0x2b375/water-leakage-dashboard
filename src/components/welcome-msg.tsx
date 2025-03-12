export const WelcomeMsg = () => {
    const user = {
        firstName: "John",
        lastName: "Doe",
    }
    const isLoaded = true;
    return (
        <div className="space-y-2 mb-4">
            <h2 className="text-2xl lg:text-4xl font-medium text-white">Welcome Back {isLoaded ? ", " : " "}{user?.firstName}</h2>
            <p className="text-sm lg:text-base text-[#89b6fd]">Water leak detection dashboard system</p>
        </div>
    );
};