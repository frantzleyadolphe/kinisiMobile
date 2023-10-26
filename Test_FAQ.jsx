import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

const FAQ = () => {
  const [activeSections, setActiveSections] = useState([]);

  const sections = [
    {
      title: 'Qu’est-ce que l’assurance automobile ?',
      content: 'L’assurance automobile est un contrat conclu entre le propriétaire d’un véhicule et une compagnie d’assurance*(OAVCT) dont l’objectif est de couvrir financièrement les risques liés à la conduite et à la possession du véhicule .'
    },
    {
      title: 'Quels sont les types d’assurance automobile disponibles ?',
      content: 'Il existe plusieurs types d’assurance automobile disponibles. Les trois principaux types d’assurance automobile sont :L’assurance au tiers : c’est la forme la plus basique d’assurance automobile. Elle couvre les dommages causés à un tiers lors d’un accident, mais ne couvre pas les dommages causés à votre propre véhicule ou à vous-même. Elle est également la moins chère des assurances automobile, mais elle ne vous offrira pas beaucoup de protection en cas d’accident. L’assurance tous risques : c’est la forme la plus complète d’assurance automobile. Elle couvre tous les dommages que vous pouvez causer à autrui avec votre véhicule, qu’ils soient matériels ou corporels. Elle vous protège également en cas de vol ou de dommages subis par votre véhicule. Cette formule d’assurance est donc la plus onéreuse, mais elle est aussi la plus avantageuse si vous avez un véhicule récent ou de luxe.  L’assurance conducteur : cette assurance couvre les dommages causés par le conducteur en cas d’accident.'
    },
    {
      title: 'Comment puis-je modifier les termes de ma police d’assurance automobile ?',
      content: 'Pour modifier les termes de votre police d’assurance automobile, vous devez contacter votre assureur et lui demander de vous envoyer un nouveau contrat avec les changements proposés sur vos garanties.'
    }
    ,
    {
      title: 'Comment puis-je renouveler ma police d’assurance si je suis à l’étranger ?',
      content: '. Vous pouvez consulter le site Web de l’OAVCT :: www.oavct.gouv.ht ::  pour plus d’informations sur les services offerts et les coordonnées de l’organisme'
    },
    ,
    {
      title: 'Comment savoir quand renouveler ma police d’assurance ?',
      content: ' NONE '
    },
    ,
    {
      title: 'Comment signaler un vol de véhicule ?',
      content: ' Pour signaler un vol de véhicule, vous pouvez vous rendre au poste de police le plus proche de chez vous et déposer une plainte. Oubien vous  devrez fournir les informations suivantes, dans les champs correspondantes, dans l"application KINISI: 1-Les caractéristiques du véhicule (marque, modèle, couleur, numéro d’immatriculation, etc.) 2-Les circonstances du vol (date, heure, lieu, etc.) 3-Les éventuels témoins du vol.'
    },
    ,
    {
      title: 'Quand dois-je signaler un vol de véhicule ?',
      content: 'Si vous êtes victime d’un vol de véhicule, il est important de signaler le vol à la police ou à la Police le plus rapidement possible. Vous devez également signaler le vol à la OAVCT dans le délai prévu par votre contrat '
    },
    ,
    {
      title: 'Comment puis-je être indemnisé si mon véhicule n’est pas retrouvé ?',
      content: 'Si votre véhicule est volé et n’est pas retrouvé, vous pouvez être indemnisé par votre assureur si vous avez souscrit une garantie contre le vol 1. La garantie contre le vol n’est pas obligatoire dans le contrat d’assurance automobile, donc vous ne serez indemnisé que si vous avez souscrit cette garantie 1. Les éléments couverts par cette garantie dépendent des contrats. Ainsi, la garantie peut inclure ou non les accessoires du véhicule '
    },
    ,
    {
      title: 'Comment demander une demande d"expertise a domicile ',
      content: 'NONE'
    },
    ,
    {
      title: '',
      content: ''
    },
    ,
    {
      title: '',
      content: ''
    },
    ,
    {
      title: '',
      content: ''
    },
    ,
    {
      title: '',
      content: ''
    },
  ];

  const renderHeader = (section) => {
    return (
      <View>
        <Text>{section.title}</Text>
      </View>
    );
  };

  const renderContent = (section) => {
    return (
      <View>
        <Text>{section.content}</Text>
      </View>
    );
  };

  const updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  return (
    <Accordion
      sections={sections}
      activeSections={activeSections}
      renderHeader={renderHeader}
      renderContent={renderContent}
      onChange={updateSections}
    />
  );
};

export default FAQ;