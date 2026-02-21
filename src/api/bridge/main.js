/** various utilties for network functions */
export const api = {
    /** return the *text* contents of a remote file from <url> */
    async read(url){
        try {
            const response = await fetch(url);

            if (!(response.ok)) {
                throw new Error(`HTTP error ${response.status}`);
            } else {
                return await response.text();
            }

        } catch (error) {

            console.error("Fetch error:", error.message);
            return null;  // return null or a default value on error incase needed
        
        }
    },
}