import { useGetCurrentSeasonCompetitions } from "./useGetCurrentSeasonCompetitions";
export function useGetSeniorCompetition() {
    const { data, ...rest } = useGetCurrentSeasonCompetitions();

    const seniorCompetition = data?.filter(comp => comp.name.includes("4. NL SREDIŠTE PODSKUPINA B")) || [];


    return { data: seniorCompetition[0], ...rest };
}
