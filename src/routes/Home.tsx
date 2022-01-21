import React from "react";
import SubHeading from "../components/SubHeading";
import Paragraph from "../components/Paragraph";
import Card from "../components/Card";

function Home() {
  return (
    <>
      <Card
        name="About Me"
        srcs={[
          "https://i.ibb.co/HDQ05Vq/full-body.png",
          "https://i.ibb.co/BfJ4rCq/Loomboy.png",
        ]}
        color1="#00a743"
        color2="#b2bb00"
      >
        <Paragraph>
          Currently based in Chicago, I have worked as a Software Engineer for
          ~3years. When I'm not busy taking care of my two cats, you can find me
          snowboarding, skateboarding, or playing weeknight trivia at the local
          bar. Outside of coding, I love to play with interior design, watch
          anime, and read.
        </Paragraph>
        <SubHeading>Career</SubHeading>
        <Paragraph>
          I'm a constant tinkerer who is passionate about progress.
        </Paragraph>
        <Paragraph>
          In my career as a Software Engineer I have tirelessly worked to
          improve my skills and tackle new challenges. I have found comfort in a
          wide variety of roles even when mapping out the unknown or learning
          something new.
        </Paragraph>
        <Paragraph>
          Starting out as a front-end engineer I found myself gravitating
          towards development tooling and page performance. I was able to
          greatly improve the development experience through the use of
          hot-reloading and optimized webpack configuration after completing a
          migration to React. In the area of performance, average load time was
          substantially reduced through the use of progressive image formats and
          profiling troublesome components to reduce bottlenecks.
        </Paragraph>
        <Paragraph>
          Hoping to increase my range of impact in improvements to performance
          and developer experience, I transitioned into an Infrastructure /
          DevOps role. Doing so allowed me to write tooling and automation used
          by a multitude of teams, saving developers countless hours.
          Additionally, I was able to substantially reduce the amount of needed
          by the infrastructure team to onboard new services onto the platform.
        </Paragraph>
        <Paragraph>
          In addition to working in an environment with mature infrastructure, I
          have also played a key role in improving infrastructure that is less
          developed. Implementing an entire production-grade metrics pipeline
          from start to finish was a test of my experience in past positions.
          Using Prometheus, Influxdb, and Grafana I was able to put together an
          efficient and fault-tolerant pipeline allowing issues to be identified
          and solved quickly.
        </Paragraph>
        <Paragraph>
          As of late, I have been diving head-first into the web3 ecosystem. In
          doing so, I have written my own smart contracts, deployed my own DAO,
          interfaced with IPFS and more!
        </Paragraph>
        <SubHeading>College</SubHeading>
        <Paragraph>
          Graduating with degrees in both Mechanical Engineering and Computer
          Science from Rose-Hulman Institute of Technology, I excelled at
          problems in the physical world, in the abstract, and anywhere
          inbetween. As a Mechanical Engineer I found success in the areas of
          Control Theory, Computational Fluid Dynamics, and Mechatronics. In my
          Computer Science curriculum I was proficient in Image Recognition,
          Computer Architecture, and Operating Systems.
        </Paragraph>
      </Card>
    </>
  );
}

export default Home;
