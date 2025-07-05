
import { useState } from 'react';
import { User, Zap, Cpu, Network, Shield, Award } from 'lucide-react';

export const CharacterGuides = () => {
  const [selectedGuide, setSelectedGuide] = useState('crashout');

  const guides = {
    crashout: {
      name: '0xCrashout',
      role: 'The Customer (Proof Requester)',
      image: '/lovable-uploads/78ebb717-8a64-46f5-89ed-74607de6a8cd.png',
      icon: <User className="w-6 h-6" />,
      analogy: '🛒 The Cake Customer',
      description: 'The festival organizer who needs special cakes (zero-knowledge proofs) for events.',
      explanation: `In the Succinct Market analogy, 0xCrashout is like a customer ordering a custom cake for a festival. In the actual Succinct Network:

**What 0xCrashout Does:**
• Submits proof requests to verify computations (like blockchain transactions)
• Pays fees in $PROVE tokens for proof generation services
• Provides the program (recipe), inputs (ingredients), and verification requirements
• Sets deadlines and complexity requirements for the proof

**Real Technical Role:**
• Users who need zero-knowledge proofs for their applications
• Blockchain developers requiring rollup verification
• Privacy-focused applications needing private computation verification
• Smart contract systems requiring trustless computation verification

**Market Economics:**
• Posts requests on the blockchain bulletin board (market board)
• Escrows fees to prevent spam and ensure commitment  
• Benefits from baker competition through bid rebates
• Receives cryptographically verified proofs with unique signatures

Just like ordering a cake that proves it was baked correctly without revealing the secret recipe, 0xCrashout gets mathematical proof of computation correctness without exposing private data.`,
      techDetails: 'Submits RISC-V programs with inputs, max_cycles, fees, deadlines, and verification keys to the Succinct Network blockchain.',
      marketRole: 'Drives demand in the proof economy, benefits from competitive pricing through proof contests.'
    },
    avidaith: {
      name: 'Avidaith',
      role: 'The Baker (Proof Generator)',
      image: '/lovable-uploads/9208e9c1-1892-41a8-9e30-c586e78ef9ed.png',
      icon: <Zap className="w-6 h-6" />,
      analogy: '👨‍🍳 The Master Baker',
      description: 'The skilled baker who competes in contests to win orders and bake verifiable cakes.',
      explanation: `Avidaith represents the proof generators (provers) in the Succinct Network:

**What Avidaith Does:**
• Competes in proof contests by bidding with collateral
• Uses SP1 zkVM to generate zero-knowledge proofs
• Earns fees for successful, timely proof delivery
• Risks collateral if proofs are late or incorrect

**Technical Process:**
• Monitors the blockchain for new proof requests
• Evaluates profitability based on cycle count, fee, and competition
• Deposits collateral and places bids in all-pay auctions
• Executes RISC-V programs in SP1 zkVM when winning contests
• Generates CORE, COMPRESSED, or GROTH16 proofs as needed

**Market Dynamics:**
• Probability of winning = bid^α / Σ(all_bids^α) where α=1 for fairness
• All bidders pay their bids, but only winner gets the fee
• This prevents monopolization and maintains decentralization
• Encourages efficiency while giving smaller provers a chance

**Economic Incentives:**  
• Profit = Fee - (Bid + Operational_Costs)
• Must balance bid size vs. winning probability
• Collateral at risk ensures honest behavior
• Can join proving pools to reduce individual risk

Like a baker competing fairly for orders while maintaining quality standards.`,
      techDetails: 'Operates GPU/CPU clusters running SP1 zkVM, generates cryptographic proofs with embedded prover signatures and nonces.',
      marketRole: 'Core network participant providing proof generation capacity, maintains network security through collateral staking.'
    },
    uma: {
      name: 'Uma',
      role: 'The Tech Genius (SP1 zkVM)',
      image: '/lovable-uploads/29015540-b096-457f-b15a-a2487cff435b.png',
      icon: <Cpu className="w-6 h-6" />,
      analogy: '🔥 The Super-Oven Inventor',
      description: 'The brilliant inventor who created the magical SP1 super-oven that bakes verifiable cakes.',
      explanation: `Uma represents the SP1 zkVM technology - the core proving engine:

**What Uma's SP1 Does:**
• Converts any RISC-V program (standard Rust code) into zero-knowledge proofs
• Provides three proof types: CORE (large), COMPRESSED (medium), GROTH16 (tiny)
• Embeds prover addresses and unique nonces to prevent proof copying
• Enables "prove any computation" capability for the network

**Technical Innovation:**
• RISC-V compatibility means any standard program can be proven
• No need for custom circuits or domain-specific languages
• Recursive proof composition for scalability
• Hardware-optimized for GPU acceleration

**Security Features:**
• Each proof includes prover identity (address) and unique nonce
• Prevents proof reuse or copying between provers
• Cryptographic guarantees of computation correctness
• Verification keys enable constant-time verification

**Network Integration:**
• Codesigned with Succinct Network for optimal performance
• Supports contest mechanism through identity embedding
• Enables diverse applications from rollups to AI verification
• Provides cost-efficiency through different proof sizes

**Real-World Impact:**
• Blockchain scaling through rollup verification
• Private computation verification
• AI inference proofs
• Cross-chain bridge validation
• Any computation requiring trustless verification

Like Uma's magical oven that can bake any recipe while proving it was made correctly, SP1 can prove any computation while maintaining mathematical guarantees.`,
      techDetails: 'RISC-V virtual machine with zero-knowledge proof generation, supports recursive composition and multiple proof formats.',
      marketRole: 'Core infrastructure enabling the entire proof economy, provides the computational foundation for all network operations.'
    },
    kshitij: {
      name: 'Kshitij',
      role: 'The Helper (Relayer)',
      image: '/lovable-uploads/e6229e3c-71e1-4b70-893b-595ae6ed3eeb.png',
      icon: <Shield className="w-6 h-6" />,
      analogy: '🔍 The Recipe Validator',
      description: 'The helpful assistant who checks recipes and calculates exact baking requirements.',
      explanation: `Kshitij represents the relayers - essential support infrastructure:

**What Kshitij Does:**
• Simulates proof requests to validate feasibility
• Calculates exact cycle counts for accurate pricing
• Provides public values needed for proof generation
• Prevents network spam through pre-validation

**Technical Process:**
• Receives user proof requests before they hit the network
• Runs simulations to compute exact resource requirements
• Posts cycle counts and public values to the blockchain
• Stakes deposits to guarantee honest behavior

**Network Benefits:**
• Prevents provers from wasting resources on invalid requests
• Enables accurate bidding through precise cycle estimation
• Reduces network congestion by filtering bad requests
• Provides optimization opportunities for common patterns

**Economic Role:**
• May charge small fees for relaying services
• Stakes collateral to ensure reliable service
• Can be slashed for providing incorrect information
• Provers can verify relayer work for additional security

**Trust Model:**
• Provers can independently verify relayer computations
• Multiple relayers can provide redundancy
• Bad relayers lose staked collateral
• System remains trustless through verification

**Examples:**
• Optimizing cycle counts for common operations
• Pre-computing witness data for standard circuits
• Filtering obviously invalid or malicious requests
• Providing gas estimation for proof operations

Like Kshitij checking that a recipe is feasible before bakers waste ingredients, relayers ensure network efficiency through pre-validation.`,
      techDetails: 'Runs SP1 simulations to compute cycle counts and public values, stakes collateral for service guarantees.',
      marketRole: 'Infrastructure provider improving network efficiency, enables better price discovery through accurate resource estimation.'
    },
    mallesh: {
      name: 'Mallesh',
      role: 'The Co-op Leader (Proving Pool)',
      image: '/lovable-uploads/e6229e3c-71e1-4b70-893b-595ae6ed3eeb.png',
      icon: <Network className="w-6 h-6" />,
      analogy: '🤝 The Baker Co-op Organizer',
      description: 'The community leader who helps small bakers pool resources to compete with big operations.',
      explanation: `Mallesh represents proving pools - democratizing network participation:

**What Mallesh's Pools Do:**
• Aggregate capacity from small-scale provers
• Bid collectively in proof contests
• Distribute profits based on contribution
• Reduce individual risk through pooling

**Pool Mechanics:**
• Individual provers contribute computational capacity
• Pool bids in contests using combined resources
• Winners share proof generation workload
• Profits distributed proportionally to contribution

**Democratization Benefits:**
• Home provers can participate without large capital
• Reduces barriers to entry for network participation
• Maintains decentralization against large operators
• Provides steady income for small participants

**Technical Coordination:**
• Load balancing across pool members
• Fault tolerance through redundancy
• Quality assurance for proof delivery
• Performance optimization across hardware types

**Economic Impact:**
• Increases total network capacity
• Maintains competitive pressure on large provers
• Provides income diversification for participants
• Reduces proof generation costs through efficiency

**Pool Types:**
• Geographic pools for latency optimization
• Hardware-specific pools (GPU vs CPU)
• Specialization pools for certain proof types
• Community pools for specific applications

**Risk Management:**
• Shared collateral reduces individual exposure
• Diversified bidding across multiple contests
• Backup systems prevent single points of failure
• Insurance funds for protection against slashing

Like Mallesh organizing small bakers into a co-op to compete with large bakeries, proving pools ensure network participation remains accessible to everyone.`,
      techDetails: 'Coordinates distributed proof generation across multiple nodes, implements load balancing and profit sharing algorithms.',
      marketRole: 'Promotes network decentralization, provides steady capacity and competitive pressure in the proof market.'
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-mono font-bold text-purple-400 mb-4">
          CHARACTER GUIDE SYSTEM
        </h2>
        <p className="text-lg font-mono text-purple-300 mb-2">
          Meet the key players in the Succinct Network ecosystem
        </p>
        <p className="text-sm font-mono text-purple-500">
          Understanding roles through relatable market analogies
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-4 mb-8">
        {Object.entries(guides).map(([key, guide]) => (
          <button
            key={key}
            onClick={() => setSelectedGuide(key)}
            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
              selectedGuide === key
                ? 'border-purple-400 bg-purple-900/50 scale-105'
                : 'border-purple-700/50 bg-purple-900/20 hover:border-purple-500'
            }`}
          >
            <div className="text-center">
              <img 
                src={guide.image} 
                alt={guide.name} 
                className="w-16 h-16 mx-auto mb-3 rounded-full object-cover"
              />
              <h3 className="font-mono text-sm font-bold text-purple-300 mb-1">
                {guide.name}
              </h3>
              <p className="font-mono text-xs text-purple-500">
                {guide.analogy}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-black/60 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-8">
        <div className="flex items-center space-x-4 mb-6">
          <img 
            src={guides[selectedGuide].image} 
            alt={guides[selectedGuide].name} 
            className="w-20 h-20 rounded-full object-cover border-2 border-purple-400"
          />
          <div>
            <h3 className="text-2xl font-mono font-bold text-purple-300">
              {guides[selectedGuide].name}
            </h3>
            <p className="font-mono text-purple-400 mb-1">
              {guides[selectedGuide].role}
            </p>
            <p className="font-mono text-cyan-400 text-sm">
              {guides[selectedGuide].analogy} {guides[selectedGuide].description}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-mono text-lg text-purple-400 mb-4">Market Analogy & Role</h4>
            <div className="bg-black/40 rounded-xl p-4">
              <pre className="font-mono text-sm text-purple-300 whitespace-pre-wrap leading-relaxed">
                {guides[selectedGuide].explanation}
              </pre>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-mono text-lg text-purple-400 mb-3">Technical Details</h4>
              <div className="bg-black/40 rounded-xl p-4">
                <p className="font-mono text-sm text-cyan-300">
                  {guides[selectedGuide].techDetails}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-mono text-lg text-purple-400 mb-3">Network Economics</h4>
              <div className="bg-black/40 rounded-xl p-4">
                <p className="font-mono text-sm text-green-300">
                  {guides[selectedGuide].marketRole}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
