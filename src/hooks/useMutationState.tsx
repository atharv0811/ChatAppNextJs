import { useMutation } from "convex/react";
import { useState } from "react";

export const useMutationState = (mutationToRun: any) => {
    const [pending, setPending] = useState(false);

    const mutationFn = useMutation(mutationToRun);

    const mutate = (paylode: any) => {
        setPending(true);

        return mutationFn(paylode)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                throw err;
            })
            .finally(() => setPending(false));
    };

    return { mutate, pending }
};
