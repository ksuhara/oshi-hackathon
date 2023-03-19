import { Box } from "@chakra-ui/react";
import Card from "components/card/Card";
import { collection, getDocs, query } from "firebase/firestore";
import Nft1 from "img/nfts/Nft1.png";
import Nft5 from "img/nfts/Nft5.png";
import AdminLayout from "layouts/admin";
import initializeFirebaseClient from "lib/initFirebase";
import { useEffect, useState } from "react";
import AdminItem from "views/admin/marketplace/components/AdminItem";

export default function Admin() {
  const [projectsData, setProjectsData] = useState<any[]>();
  const { db } = initializeFirebaseClient();

  useEffect(() => {
    const projectsQuery = query(collection(db, "projects"));
    const fetch = async () => {
      let extractData: any = [];
      const querySnapshot = await getDocs(projectsQuery);
      querySnapshot.forEach((doc) => {
        extractData.push({ ...doc.data(), uid: doc.id });
      });
      setProjectsData(extractData);
    };
    fetch();
  }, [db]);

  return (
    <AdminLayout>
      <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
        <Card p="0px">
          {projectsData?.map((project, index) => {
            return (
              <AdminItem
                key={project.uid}
                name={project.name}
                date={project.goalDate.toDate().toLocaleDateString()}
                image={index % 2 == 1 ? Nft5 : Nft1}
                projectId={project.uid}
              />
            );
          })}
        </Card>
      </Box>
    </AdminLayout>
  );
}
