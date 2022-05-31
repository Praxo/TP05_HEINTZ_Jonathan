<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Pizza
 *
 * @ORM\Table(name="pizza")
 * @ORM\Entity
 */
class Pizza
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_pizza", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="pizza_id_pizza_seq", allocationSize=1, initialValue=1)
     */
    private $idPizza;

    /**
     * @var string|null
     *
     * @ORM\Column(name="nom", type="string", length=100, nullable=true)
     */
    private $nom;

    /**
     * @var int|null
     *
     * @ORM\Column(name="prix", type="integer", nullable=true)
     */
    private $prix;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description", type="string", length=256, nullable=true)
     */
    private $description;

    /**
     * @var string|null
     *
     * @ORM\Column(name="type", type="string", length=100, nullable=true)
     */
    private $type;

    /**
     * @var string|null
     *
     * @ORM\Column(name="img_url", type="string", length=100, nullable=true)
     */
    private $imgUrl;


    /**
     * Get idPizza.
     *
     * @return int
     */
    public function getIdPizza()
    {
        return $this->idPizza;
    }

    /**
     * Set nom.
     *
     * @param string|null $nom
     *
     * @return Pizza
     */
    public function setNom($nom = null)
    {
        $this->nom = $nom;

        return $this;
    }

    /**
     * Get nom.
     *
     * @return string|null
     */
    public function getNom()
    {
        return $this->nom;
    }

    /**
     * Set prix.
     *
     * @param int|null $prix
     *
     * @return Pizza
     */
    public function setPrix($prix = null)
    {
        $this->prix = $prix;

        return $this;
    }

    /**
     * Get prix.
     *
     * @return int|null
     */
    public function getPrix()
    {
        return $this->prix;
    }

    /**
     * Set description.
     *
     * @param string|null $description
     *
     * @return Pizza
     */
    public function setDescription($description = null)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description.
     *
     * @return string|null
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set type.
     *
     * @param string|null $type
     *
     * @return Pizza
     */
    public function setType($type = null)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type.
     *
     * @return string|null
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set imgUrl.
     *
     * @param string|null $imgUrl
     *
     * @return Pizza
     */
    public function setImgUrl($imgUrl = null)
    {
        $this->imgUrl = $imgUrl;

        return $this;
    }

    /**
     * Get imgUrl.
     *
     * @return string|null
     */
    public function getImgUrl()
    {
        return $this->imgUrl;
    }
}
